const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const https = require('https');
const http = require('http');

function decodeBody(buffer, encoding) {
    const enc = (encoding || '').toLowerCase();
    if (enc.indexOf('gzip') >= 0) return zlib.gunzipSync(buffer).toString('utf8');
    if (enc.indexOf('deflate') >= 0) return zlib.inflateSync(buffer).toString('utf8');
    if (enc.indexOf('br') >= 0 && zlib.brotliDecompressSync) return zlib.brotliDecompressSync(buffer).toString('utf8');
    return buffer.toString('utf8');
}

function requestOnce(url, opts) {
    return new Promise((resolve, reject) => {
        const u = new URL(url);
        const mod = u.protocol === 'https:' ? https : http;
        const req = mod.request(url, {
            method: opts.method || 'GET',
            headers: opts.headers || {},
            timeout: opts.timeoutMs || 15000
        }, (res) => {
            const chunks = [];
            res.on('data', (c) => chunks.push(c));
            res.on('end', () => {
                const rawBuffer = Buffer.concat(chunks);
                let body = '';
                try {
                    body = decodeBody(rawBuffer, res.headers['content-encoding']);
                } catch (_) {
                    body = rawBuffer.toString('utf8');
                }
                resolve({
                    ok: res.statusCode >= 200 && res.statusCode < 300,
                    status: res.statusCode,
                    statusText: res.statusMessage || '',
                    headers: res.headers || {},
                    body
                });
            });
        });
        req.on('error', reject);
        req.on('timeout', () => req.destroy(new Error('Request timeout')));
        if (opts.body) req.write(opts.body);
        req.end();
    });
}

async function requestRaw(url, options) {
    const method = (options.method || 'GET').toUpperCase();
    const headers = Object.assign({
        'Accept-Encoding': 'gzip, deflate, br'
    }, options.headers || {});
    const retries = Number(options.retries || 0);
    const maxRedirects = Number(options.maxRedirects || 3);
    const followRedirects = options.followRedirects !== false;
    const timeoutMs = Number(options.timeoutMs || 15000);
    const body = options.body || '';
    const trace = [];

    let currentUrl = url;
    let redirects = 0;
    let attempts = 0;

    while (true) {
        attempts++;
        try {
            const out = await requestOnce(currentUrl, { method, headers, body, timeoutMs });
            trace.push({ url: currentUrl, status: out.status });

            const loc = out.headers.location;
            if (followRedirects && loc && [301, 302, 303, 307, 308].indexOf(out.status) >= 0) {
                if (redirects >= maxRedirects) {
                    throw new Error('Too many redirects');
                }
                currentUrl = new URL(loc, currentUrl).toString();
                redirects++;
                continue;
            }

            out.trace = trace;
            out.finalUrl = currentUrl;
            out.attempts = attempts;
            return out;
        } catch (err) {
            if (attempts > retries) throw err;
        }
    }
}

function parseBody(raw, mode) {
    if (mode === 'text') return { mode: 'text', data: raw };
    try {
        return { mode: 'json', data: JSON.parse(raw) };
    } catch (_) {
        return { mode: 'text', data: raw };
    }
}

function getByPath(obj, dotPath) {
    if (!dotPath) return obj;
    return dotPath.split('.').reduce((acc, key) => (acc == null ? acc : acc[key]), obj);
}

function generateVbookFetchScript(spec) {
    const headers = JSON.stringify(spec.headers || {}, null, 4);
    const bodyLine = spec.body ? `,\n        body: ${JSON.stringify(spec.body)}` : '';
    const queryLine = (spec.queries && Object.keys(spec.queries).length > 0)
        ? `,\n        queries: ${JSON.stringify(spec.queries, null, 8)}`
        : '';
    const parseLine = (spec.expect === 'text')
        ? 'var data = res.text();'
        : 'var data = res.json();';
    const extract = spec.extract_path
        ? `var extracted = (function(x){ try { return ${JSON.stringify(spec.extract_path)}.split('.').reduce(function(a,k){ return a != null ? a[k] : null; }, x); } catch(e) { return null; } })(data);\n    return Response.success(extracted);`
        : 'return Response.success(data);';

    return `function execute(url) {
    var apiUrl = ${JSON.stringify(spec.url)};
    var res = fetch(apiUrl, {
        method: ${JSON.stringify(spec.method || 'GET')},
        headers: ${headers}${bodyLine}${queryLine}
    });
    if (!res.ok) return Response.error("HTTP " + res.status + " " + res.statusText);
    ${parseLine}
    ${extract}
}
`;
}

function sanitizeFileName(name) {
    return String(name || '').replace(/[^a-zA-Z0-9._-]/g, '_').replace(/^_+/, '').slice(0, 80) || 'preflight';
}

function saveSpec(projectRoot, name, payload) {
    const dir = path.join(projectRoot, 'vbook-tool', 'tmp');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const safe = sanitizeFileName(name);
    const file = path.join(dir, `${safe}.json`);
    fs.writeFileSync(file, JSON.stringify(payload, null, 2), 'utf8');
    return file;
}

module.exports = {
    requestRaw,
    parseBody,
    getByPath,
    generateVbookFetchScript,
    saveSpec
};
