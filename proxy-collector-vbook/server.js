const express = require("express");
const net = require("net");
const fs = require("fs");
const path = require("path");

// Load .env (optional)
try {
    require("dotenv").config({ path: path.join(__dirname, ".env") });
} catch { }

const app = express();

const LISTEN_HOST = process.env.HOST || "0.0.0.0";
const LISTEN_PORT = Number(process.env.PORT || 18080);

// Target is the phone/device running Vbook App debug server
const TARGET_HOST = process.env.TARGET_HOST || "192.168.0.40";
const TARGET_PORT = Number(process.env.TARGET_PORT || 8080);

const MAX_LOG_CHARS = Number(process.env.MAX_LOG_CHARS || 200000);

const LOG_LEVEL = (process.env.LOG_LEVEL || "ai").toLowerCase(); // ai | full

const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, "data");
fs.mkdirSync(DATA_DIR, { recursive: true });

function nowIso() {
    return new Date().toISOString();
}

function safeJsonParse(str) {
    try {
        return JSON.parse(str);
    } catch {
        return null;
    }
}

function decodeBase64Json(b64) {
    try {
        const raw = Buffer.from(b64, "base64").toString("utf8");
        return { raw, json: safeJsonParse(raw) };
    } catch (e) {
        return { raw: null, json: null, error: String(e) };
    }
}

function extractDataHeader(req) {
    // Extension sends: header "data: <base64>" (non-standard)
    // Node/Express lowercases headers
    const header = req.headers["data"];
    if (typeof header === "string") return header.trim();
    if (Array.isArray(header)) return header[0]?.trim();
    return null;
}

function newSessionId() {
    // readable session id
    const t = Date.now().toString(36);
    const r = Math.random().toString(36).slice(2, 8);
    return `${t}-${r}`;
}

function appendJsonl(sessionId, event) {
    const filePath = path.join(DATA_DIR, `${sessionId}.jsonl`);
    fs.appendFileSync(filePath, JSON.stringify(event) + "\n", "utf8");
    return filePath;
}

function truncateString(str, maxChars) {
    if (typeof str !== "string") return str;
    if (!Number.isFinite(maxChars) || maxChars <= 0) return str;
    if (str.length <= maxChars) return str;
    return str.slice(0, maxChars) + `\n... [truncated ${str.length - maxChars} chars]`;
}

function pickIncomingForAi(decoded) {
    const j = decoded?.json;
    if (!j || typeof j !== "object") {
        return {
            ok: false,
        };
    }
    const input = Array.isArray(j.input) ? j.input : undefined;
    return {
        ok: true,
        input,
        root: j.root,
        language: j.language,
        ip: j.ip,
        scriptLength: typeof j.script === "string" ? j.script.length : undefined,
    };
}

function buildAiOutgoingPayload(parsed) {
    const status = parsed?.status;
    const log = typeof parsed?.log === "string" ? parsed.log : undefined;
    const exception = typeof parsed?.exception === "string" ? parsed.exception : undefined;
    const resultRaw = typeof parsed?.result === "string" ? parsed.result : undefined;
    const resultJson = resultRaw ? safeJsonParse(resultRaw) : null;
    const data = resultJson && typeof resultJson === "object" ? resultJson.data : undefined;
    return {
        status,
        exception,
        log: truncateString(log, MAX_LOG_CHARS),
        resultRaw: truncateString(resultRaw, MAX_LOG_CHARS),
        result: resultJson,
        data,
    };
}

function tcpForwardHttpRaw({ host, port, rawRequest, timeoutMs = 20000 }) {
    return new Promise((resolve, reject) => {
        const client = new net.Socket();
        let responseData = "";
        let finished = false;

        const done = (err) => {
            if (finished) return;
            finished = true;
            try {
                client.destroy();
            } catch { }
            if (err) reject(err);
            else resolve(responseData);
        };

        client.setTimeout(timeoutMs);

        client.connect(port, host, () => {
            client.write(rawRequest);
        });

        client.on("data", (chunk) => {
            responseData += chunk.toString();
        });

        client.on("end", () => done());
        client.on("timeout", () => done(new Error("Upstream timeout")));
        client.on("error", (e) => done(e));
    });
}

app.get("/health", (req, res) => {
    res.json({ ok: true, time: nowIso(), target: { host: TARGET_HOST, port: TARGET_PORT } });
});

// Main compatible endpoint
app.get("/test", async (req, res) => {
    const sessionId = req.headers["x-session-id"] || newSessionId();
    const dataHeader = extractDataHeader(req);
    const decoded = dataHeader ? decodeBase64Json(dataHeader) : null;

    const startedAt = Date.now();
    const meta = {
        sessionId,
        time: nowIso(),
        remoteAddr: req.socket.remoteAddress,
        userAgent: req.headers["user-agent"],
        hasData: !!dataHeader,
    };

    if (LOG_LEVEL === "full") {
        appendJsonl(sessionId, {
            type: "incoming",
            ...meta,
            request: {
                method: req.method,
                path: req.originalUrl,
                headers: req.headers,
                dataDecoded: decoded,
            },
        });
    } else {
        appendJsonl(sessionId, {
            type: "incoming",
            ...meta,
            request: {
                method: req.method,
                path: req.originalUrl,
                data: pickIncomingForAi(decoded),
            },
        });
    }

    // Reconstruct the raw HTTP request to send upstream to phone
    // Keep most headers from extension, but ensure Host uses upstream.
    const lines = [];
    lines.push(`GET /test HTTP/1.1`);
    lines.push(`Host: ${TARGET_HOST}:${TARGET_PORT}`);
    lines.push(`Connection: close`);

    // Preserve extension headers that might matter
    if (req.headers["user-agent"]) lines.push(`User-Agent: ${req.headers["user-agent"]}`);
    if (req.headers["accept-encoding"]) lines.push(`Accept-Encoding: ${req.headers["accept-encoding"]}`);

    if (dataHeader) lines.push(`data: ${dataHeader}`);
    const rawUpstreamRequest = lines.join("\r\n") + "\r\n\r\n";

    let upstreamRaw;
    try {
        upstreamRaw = await tcpForwardHttpRaw({
            host: TARGET_HOST,
            port: TARGET_PORT,
            rawRequest: rawUpstreamRequest,
            timeoutMs: 20000,
        });
    } catch (e) {
        const errMsg = e instanceof Error ? e.message : String(e);
        appendJsonl(sessionId, {
            type: "upstream_error",
            ...meta,
            error: errMsg,
            durationMs: Date.now() - startedAt,
        });
        // Return something extension can display
        res.status(502).send(
            JSON.stringify({
                code: -1,
                exception: `Proxy upstream error: ${errMsg}`,
            }),
        );
        return;
    }

    if (LOG_LEVEL === "full") {
        appendJsonl(sessionId, {
            type: "upstream_raw",
            ...meta,
            durationMs: Date.now() - startedAt,
            upstream: { host: TARGET_HOST, port: TARGET_PORT },
            responseRaw: truncateString(upstreamRaw, MAX_LOG_CHARS),
        });
    }

    // Forward upstream response back to extension.
    // Extension parses by searching '{' and JSON.parse, so we can just return raw body if possible.
    const bodyStart = upstreamRaw.indexOf("{");
    if (bodyStart >= 0) {
        const jsonBody = upstreamRaw.slice(bodyStart);
        res.status(200).type("application/json").send(jsonBody);

        const parsed = safeJsonParse(jsonBody);
        if (LOG_LEVEL === "full") {
            appendJsonl(sessionId, {
                type: "outgoing",
                ...meta,
                response: { json: parsed, jsonRaw: truncateString(jsonBody, MAX_LOG_CHARS) },
            });
        } else {
            appendJsonl(sessionId, {
                type: "outgoing",
                ...meta,
                response: buildAiOutgoingPayload(parsed),
            });
        }
        return;
    }

    // Fallback: send whole raw response
    res.status(200).type("text/plain").send(upstreamRaw);
    if (LOG_LEVEL === "full") {
        appendJsonl(sessionId, {
            type: "outgoing",
            ...meta,
            response: { json: null, jsonRaw: null, fallbackRaw: truncateString(upstreamRaw, MAX_LOG_CHARS) },
        });
    } else {
        appendJsonl(sessionId, {
            type: "outgoing",
            ...meta,
            response: { status: null, exception: null, log: null, resultRaw: null, result: null, data: null },
        });
    }
});

app.get("/sessions/:id/latest", (req, res) => {
    const sessionId = req.params.id;
    const filePath = path.join(DATA_DIR, `${sessionId}.jsonl`);
    if (!fs.existsSync(filePath)) {
        res.status(404).json({ error: "session_not_found" });
        return;
    }

    const content = fs.readFileSync(filePath, "utf8");
    const lines = content.split("\n").filter(Boolean);
    for (let i = lines.length - 1; i >= 0; i--) {
        const evt = safeJsonParse(lines[i]);
        if (!evt) continue;
        if (evt.type === "outgoing") {
            res.json({ sessionId, latest: evt });
            return;
        }
    }
    res.json({ sessionId, latest: null });
});

// Read sessions for AI
app.get("/sessions", (req, res) => {
    const files = fs
        .readdirSync(DATA_DIR)
        .filter((f) => f.endsWith(".jsonl"))
        .map((f) => {
            const full = path.join(DATA_DIR, f);
            const stat = fs.statSync(full);
            return {
                sessionId: f.replace(/\.jsonl$/, ""),
                file: f,
                bytes: stat.size,
                mtime: stat.mtime.toISOString(),
            };
        })
        .sort((a, b) => (a.mtime < b.mtime ? 1 : -1));
    res.json({ dataDir: DATA_DIR, sessions: files });
});

app.get("/sessions/:id", (req, res) => {
    const sessionId = req.params.id;
    const filePath = path.join(DATA_DIR, `${sessionId}.jsonl`);
    if (!fs.existsSync(filePath)) {
        res.status(404).json({ error: "session_not_found" });
        return;
    }
    const content = fs.readFileSync(filePath, "utf8");
    const lines = content
        .split("\n")
        .filter(Boolean)
        .map((l) => safeJsonParse(l))
        .filter((x) => x);
    res.json({ sessionId, events: lines });
});

app.listen(LISTEN_PORT, LISTEN_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(
        `[proxy-collector] listening on http://${LISTEN_HOST}:${LISTEN_PORT} -> upstream ${TARGET_HOST}:${TARGET_PORT}`,
    );
    // eslint-disable-next-line no-console
    console.log(`[proxy-collector] data dir: ${DATA_DIR}`);
});
