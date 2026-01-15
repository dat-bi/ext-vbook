const path = require("path");

try {
    require("dotenv").config({ path: path.join(__dirname, ".env") });
} catch { }

function parseArgs(argv) {
    const args = {
        proxy: process.env.PROXY_URL || `http://127.0.0.1:${process.env.PORT || 18080}`,
        session: null,
        latest: false,
        raw: false,
        noLlm: false,
        json: false,
    };

    for (let i = 2; i < argv.length; i++) {
        const a = argv[i];
        if (a === "--proxy") args.proxy = argv[++i];
        else if (a === "--session") args.session = argv[++i];
        else if (a === "--latest") args.latest = true;
        else if (a === "--raw") args.raw = true;
        else if (a === "--no-llm") args.noLlm = true;
        else if (a === "--json") args.json = true;
        else if (a === "--help" || a === "-h") args.help = true;
    }

    return args;
}

async function httpJson(url, { method = "GET", headers = {}, body } = {}) {
    const res = await fetch(url, {
        method,
        headers: {
            "content-type": "application/json",
            ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
    });

    const text = await res.text();
    const json = (() => {
        try {
            return JSON.parse(text);
        } catch {
            return null;
        }
    })();

    if (!res.ok) {
        const err = new Error(`HTTP ${res.status} ${res.statusText} for ${url}`);
        err.status = res.status;
        err.responseText = text;
        err.responseJson = json;
        throw err;
    }

    return { status: res.status, headers: Object.fromEntries(res.headers.entries()), text, json };
}

function normalizeProxyUrl(u) {
    if (!u) return u;
    if (u.startsWith("http://") || u.startsWith("https://")) return u.replace(/\/$/, "");
    return `http://${u}`.replace(/\/$/, "");
}

function pickLatestOutgoing(evt) {
    if (!evt) return null;
    const latest = evt.latest || evt;
    if (latest.type === "outgoing") return latest;
    if (latest.latest && latest.latest.type === "outgoing") return latest.latest;
    return null;
}

function safeJsonParse(str) {
    try {
        return JSON.parse(str);
    } catch {
        return null;
    }
}

function extractAiPayloadFromOutgoing(outgoing) {
    const resp = outgoing?.response;
    if (!resp) return null;

    if (Object.prototype.hasOwnProperty.call(resp, "data") || Object.prototype.hasOwnProperty.call(resp, "result")) {
        return resp;
    }

    const parsed = resp.json;
    const status = parsed?.status;
    const log = parsed?.log;
    const exception = parsed?.exception;
    const resultRaw = typeof parsed?.result === "string" ? parsed.result : undefined;
    const result = resultRaw ? safeJsonParse(resultRaw) : null;
    const data = result && typeof result === "object" ? result.data : undefined;

    return { status, log, exception, resultRaw, result, data };
}

function buildReport({ sessionId, incoming, outgoing, aiPayload, raw }) {
    const report = {
        sessionId,
        time: outgoing?.time || incoming?.time,
        input: incoming?.request?.data?.input,
        root: incoming?.request?.data?.root,
        language: incoming?.request?.data?.language,
        ip: incoming?.request?.data?.ip,
        status: aiPayload?.status,
        exception: aiPayload?.exception,
        log: aiPayload?.log,
        data: aiPayload?.data,
    };

    if (raw) {
        report.outgoing = outgoing;
        report.aiPayload = aiPayload;
        report.incoming = incoming;
    }

    return report;
}

async function callChatCompletions({ baseUrl, apiKey, model, messages }) {
    const url = `${baseUrl.replace(/\/$/, "")}/v1/chat/completions`;
    const body = {
        model,
        messages,
        temperature: 0.2,
    };

    const r = await httpJson(url, {
        method: "POST",
        headers: {
            authorization: `Bearer ${apiKey}`,
        },
        body,
    });

    const content = r.json?.choices?.[0]?.message?.content;
    if (!content) {
        const err = new Error("LLM returned no content");
        err.responseJson = r.json;
        throw err;
    }

    return content;
}

function printHelp() {
    const msg = `Usage:
  node cli.js --latest [--proxy http://127.0.0.1:18080]
  node cli.js --session <id> [--proxy http://127.0.0.1:18080]

Options:
  --proxy <url>     Proxy base URL (default: env PROXY_URL or http://127.0.0.1:<PORT>)
  --latest          Use latest session in /sessions
  --session <id>    Use a specific sessionId
  --no-llm          Do not call LLM (just print extracted report)
  --json            Print report JSON
  --raw             Include raw events in report
`;
    process.stdout.write(msg);
}

async function main() {
    const args = parseArgs(process.argv);
    if (args.help) {
        printHelp();
        return;
    }

    const proxy = normalizeProxyUrl(args.proxy);

    let sessionId = args.session;
    if (!sessionId) {
        if (!args.latest) {
            throw new Error("Missing --session <id> or --latest");
        }
        const sessions = await httpJson(`${proxy}/sessions`);
        const first = sessions.json?.sessions?.[0]?.sessionId;
        if (!first) throw new Error("No sessions found on proxy");
        sessionId = first;
    }

    const latest = await httpJson(`${proxy}/sessions/${encodeURIComponent(sessionId)}/latest`);
    const outgoing = pickLatestOutgoing(latest.json);

    let incoming = null;
    try {
        const full = await httpJson(`${proxy}/sessions/${encodeURIComponent(sessionId)}`);
        const events = Array.isArray(full.json?.events) ? full.json.events : [];
        incoming = events.find((e) => e?.type === "incoming") || null;
    } catch {
        incoming = null;
    }

    const aiPayload = extractAiPayloadFromOutgoing(outgoing);
    const report = buildReport({ sessionId, incoming, outgoing, aiPayload, raw: args.raw });

    if (args.noLlm) {
        if (args.json) process.stdout.write(JSON.stringify(report, null, 2) + "\n");
        else {
            process.stdout.write(`sessionId: ${report.sessionId}\n`);
            if (report.input) process.stdout.write(`input: ${JSON.stringify(report.input)}\n`);
            if (report.exception) process.stdout.write(`exception: ${report.exception}\n`);
            if (typeof report.status !== "undefined") process.stdout.write(`status: ${report.status}\n`);
            if (report.log) process.stdout.write(`log:\n${report.log}\n`);
            if (report.data) process.stdout.write(`data:\n${JSON.stringify(report.data, null, 2)}\n`);
        }
        return;
    }

    const apiKey = process.env.AI_API_KEY;
    const baseUrl = process.env.AI_BASE_URL || "https://api.openai.com";
    const model = process.env.AI_MODEL || "gpt-4o-mini";

    if (!apiKey) {
        throw new Error("Missing AI_API_KEY in environment (.env)");
    }

    const system =
        "You are an expert at debugging Vbook plugin scripts (JavaScript). " +
        "You will be given the test input URL, execution log, exception, and extracted result data. " +
        "Return a concise diagnosis and concrete code-level suggestions (selectors/fallbacks/error handling).";

    const user = {
        sessionId: report.sessionId,
        input: report.input,
        root: report.root,
        language: report.language,
        status: report.status,
        exception: report.exception,
        log: report.log,
        data: report.data,
    };

    const content = await callChatCompletions({
        baseUrl,
        apiKey,
        model,
        messages: [
            { role: "system", content: system },
            { role: "user", content: JSON.stringify(user, null, 2) },
        ],
    });

    if (args.json) {
        process.stdout.write(
            JSON.stringify(
                {
                    report,
                    ai: {
                        model,
                        baseUrl,
                        content,
                    },
                },
                null,
                2,
            ) + "\n",
        );
        return;
    }

    process.stdout.write(content + "\n");
}

main().catch((e) => {
    const msg = e instanceof Error ? e.message : String(e);
    process.stderr.write(msg + "\n");
    if (e && e.responseText) {
        process.stderr.write(String(e.responseText).slice(0, 2000) + "\n");
    }
    process.exitCode = 1;
});
