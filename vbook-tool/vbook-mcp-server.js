#!/usr/bin/env node
/**
 * VBook MCP Server
 * Exposes vbook CLI commands as MCP tools so AI agents can call them directly
 * without needing user approval for each command.
 *
 * Usage (stdio transport):
 *   node vbook-mcp-server.js
 *
 * Register in your MCP client config (e.g. Claude Desktop, Antigravity):
 *   {
 *     "mcpServers": {
 *       "vbook": {
 *         "command": "node",
 *         "args": ["d:/github/ext-vbookb/vbook-tool/vbook-mcp-server.js"]
 *       }
 *     }
 *   }
 */

const path = require('path');
const { execFile } = require('child_process');
const { promisify } = require('util');
const fs = require('fs');

require('dotenv').config({ path: path.join(__dirname, '.env') });

const execFileAsync = promisify(execFile);
const CLI = path.join(__dirname, 'index.js');
const PROJECT_ROOT = path.dirname(__dirname);
const TEMPLATES_DIR = path.join(PROJECT_ROOT, 'templates');
const BOOTSTRAP_DOCS = [
    '00_BOOTSTRAP.md',
    '01_runtime.md',
    '01_runtime_api.md',
    '02_workflow.md',
    '03_HARD_SITES.md',
    '04_demo.md'
];

// ─── Smart Enforcement Layer ──────────────────────────────────────────────────
const sessionState    = require('./lib/session-state');
const gate            = require('./lib/gate');
const detector        = require('./lib/violation-detector');
const responseWrapper = require('./lib/response-wrapper');
const nodePreflight  = require('./lib/node-preflight');

// ─── MCP stdio protocol helpers ───────────────────────────────────────────────

process.stdin.setEncoding('utf8');
let inputBuffer = '';

process.stdin.on('data', (chunk) => {
    inputBuffer += chunk;
    const lines = inputBuffer.split('\n');
    inputBuffer = lines.pop(); // keep incomplete last line
    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;
        try {
            const msg = JSON.parse(trimmed);
            handleMessage(msg);
        } catch (e) {
            // ignore non-JSON lines
        }
    }
});

function sendJson(obj) {
    process.stdout.write(JSON.stringify(obj) + '\n');
}

function sendResult(id, result) {
    sendJson({ jsonrpc: '2.0', id, result });
}

function sendError(id, code, message) {
    sendJson({ jsonrpc: '2.0', id, error: { code, message } });
}

// ─── Tool definitions ─────────────────────────────────────────────────────────

const TOOLS = [
    {
        name: 'bootstrap_session',
        description: 'MANDATORY FIRST TOOL at the start of every AI session. Loads concise VBook docs, persists session state, and returns the required next step.',
        inputSchema: {
            type: 'object',
            properties: {
                extension_name: { type: 'string', description: 'Optional extension currently being worked on' }
            },
            required: []
        }
    },
    {
        name: 'check_env',
        description: '🚨 MANDATORY FIRST STEP. Check environment config (VBOOK_IP, VBOOK_PORT) and device connectivity. ALWAYS run this before any debug/test/publish operation. If it fails, STOP and notify user.',
        inputSchema: {
            type: 'object',
            properties: {},
            required: []
        }
    },
    {
        name: 'node_preflight_probe',
        description: 'Fast preflight using Node HTTP(S): test API URL, headers, method, and capture response. Use before VBook debug for difficult sites.',
        inputSchema: {
            type: 'object',
            properties: {
                url: { type: 'string' },
                method: { type: 'string', enum: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] },
                headers: { type: 'object' },
                body: { type: 'string' },
                expect: { type: 'string', enum: ['json', 'text'], default: 'json' },
                timeout_ms: { type: 'number' },
                retries: { type: 'number', default: 0 },
                follow_redirects: { type: 'boolean', default: true },
                max_redirects: { type: 'number', default: 3 },
                extract_path: { type: 'string', description: 'Optional dot path to extract from JSON response, e.g. data.items' },
                save_as: { type: 'string', description: 'Optional filename (without extension) to save preflight result spec' }
            },
            required: ['url']
        }
    },
    {
        name: 'convert_preflight_to_vbook_fetch',
        description: 'Convert a preflight request spec to Rhino-safe VBook fetch execute() script.',
        inputSchema: {
            type: 'object',
            properties: {
                spec: {
                    type: 'object',
                    properties: {
                        url: { type: 'string' },
                        method: { type: 'string' },
                        headers: { type: 'object' },
                        body: { type: 'string' },
                        expect: { type: 'string', enum: ['json', 'text'] },
                        queries: { type: 'object' },
                        extract_path: { type: 'string' }
                    },
                    required: ['url']
                }
            },
            required: ['spec']
        }
    },
    {
        name: 'analyze',
        description: 'Analyze a website DOM structure using the VBook Browser API. Returns CSS selectors for book lists, names, covers, and pagination. Also detects Cloudflare, Next.js, GBK encoding.',
        inputSchema: {
            type: 'object',
            properties: {
                url: { type: 'string', description: 'URL to analyze (e.g. https://example.com)' },
                extension_dir: { type: 'string', description: 'Path to an extension dir to run from (any valid extension, used for context). Defaults to first found.' }
            },
            required: ['url']
        }
    },
    {
        name: 'create',
        description: 'Scaffold a new VBook extension with templates. Creates plugin.json, src/*.js files, and downloads favicon.',
        inputSchema: {
            type: 'object',
            properties: {
                name: { type: 'string', description: 'Extension directory name (no spaces, e.g. truyenfull)' },
                source: { type: 'string', description: 'Source website URL (e.g. https://truyenfull.io)' },
                type: { type: 'string', enum: ['novel', 'comic', 'chinese_novel', 'translate', 'tts'], description: 'Extension type' },
                locale: { type: 'string', description: 'Locale code (vi_VN, zh_CN, en_US)', default: 'vi_VN' },
                tag: { type: 'string', description: 'Optional tag (e.g. nsfw)' },
                minimal: { type: 'boolean', description: 'Only create required files (detail, page, toc, chap)' }
            },
            required: ['name', 'source', 'type']
        }
    },
    {
        name: 'create_smart',
        description: 'AI-powered creation that attempts to auto-detect selectors. Requires URLs for all major pages.',
        inputSchema: {
            type: 'object',
            properties: {
                name: { type: 'string', description: 'Extension directory name' },
                source: { type: 'string', description: 'Source website URL' },
                type: { type: 'string', enum: ['novel', 'comic', 'chinese_novel', 'translate', 'tts'] },
                locale: { type: 'string', default: 'vi_VN' },
                tag: { type: 'string', enum: ['Normal', '18+'] },
                url_home: { type: 'string' },
                url_detail: { type: 'string' },
                url_toc: { type: 'string' },
                url_chap: { type: 'string' },
                has_search: { type: 'boolean' },
                has_genre: { type: 'boolean' }
            },
            required: ['name', 'source', 'type', 'url_detail', 'url_toc', 'url_chap']
        }
    },
    {
        name: 'create_extension_flow',
        description: '🚨 MANDATORY FIRST STEP for creating ANY new extension. Handles: (1) env check, (2) collect required URLs from user, (3) scaffold from templates/_demo_* template. AI MUST call this before writing any script. If status=need_answers, AI MUST ask the user for the listed info and call again with answers object. Never skip this flow.',
        inputSchema: {
            type: 'object',
            properties: {
                site_url: { type: 'string', description: 'The base URL of the website' },
                answers: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                        type: { type: 'string', enum: ['novel', 'comic', 'video', 'chinese_novel', 'translate', 'tts'] },
                        tag: { type: 'string', enum: ['Normal', '18+'] },
                        url_listing: { type: 'string' },
                        url_detail: { type: 'string' },
                        url_toc: { type: 'string' },
                        url_chap: { type: 'string' },
                        has_search: { type: 'boolean' },
                        has_genre: { type: 'boolean' }
                    }
                }
            },
            required: ['site_url']
        }
    },
    {
        name: 'validate',
        description: 'Validate extension structure, plugin.json fields, and Rhino (ES6 subset) compatibility. Fix all errors before debugging.',
        inputSchema: {
            type: 'object',
            properties: {
                extension_path: { type: 'string', description: 'Path to extension directory. Defaults to current dir.' }
            },
            required: []
        }
    },
    {
        name: 'debug',
        description: 'Send a single script to the VBook device for testing via Modern HTTP API. Returns structured JSON with success, data, log, exception, and time.',
        inputSchema: {
            type: 'object',
            properties: {
                file: { type: 'string', description: 'Path to script file (e.g. extensions/ntruyen/src/detail.js)' },
                input: { type: 'string', description: 'Test input string (e.g. URL for detail.js)' }
            },
            required: ['file']
        }
    },
    {
        name: 'test_all',
        description: 'Run the full extension test chain: home → gen → detail → [page] → toc → chap via Modern HTTP API. Returns JSON with success/failure per step.',
        inputSchema: {
            type: 'object',
            properties: {
                extension_path: { type: 'string', description: 'Path to extension directory.' },
                from_step: { type: 'string', enum: ['home', 'gen', 'detail', 'page', 'toc', 'chap'], description: 'Start from this step (skips earlier steps)' },
                skip: { type: 'string', description: 'Comma-separated steps to skip (e.g. home,gen)' }
            },
            required: []
        }
    },
    {
        name: 'build',
        description: 'Package extension into plugin.zip. Use --bump to auto-increment version.',
        inputSchema: {
            type: 'object',
            properties: {
                extension_path: { type: 'string', description: 'Path to extension directory.' },
                bump: { type: 'boolean', description: 'Auto-increment version number in plugin.json' },
                skip_validate: { type: 'boolean', description: 'Skip validation before build' }
            },
            required: []
        }
    },
    {
        name: 'publish',
        description: 'Build extension + update root plugin.json registry. AUTOMATICALLY runs pre-publish checklist before building: verifies all scripts exist, type-specific files (track.js for video), and config.js pattern. Set skip_validate=true only if you are sure all checks pass. Final step after test_all passes.',
        inputSchema: {
            type: 'object',
            properties: {
                extension_path: { type: 'string', description: 'Path to extension directory.' },
                skip_validate: { type: 'boolean', description: 'Skip pre-publish checklist and validation' }
            },
        }
    },
    {
        name: 'publish_my_extensions',
        description: 'Build and publish bulk extensions that match the author specified in vbook-tool/.env. Extremely useful to update the registry specifically for your own extensions.',
        inputSchema: {
            type: 'object',
            properties: {
                skip_validate: { type: 'boolean', description: 'Skip validation step' }
            },
            required: []
        }
    },
    {
        name: 'install',
        description: 'Install (push) an extension directly to the physical VBook device via Modern HTTP API.',
        inputSchema: {
            type: 'object',
            properties: {
                extension_path: { type: 'string', description: 'Path to extension directory.' }
            },
            required: []
        }
    },
    {
        name: 'list_extensions',
        description: 'List all extensions in the project with their name, version, type, and status (has zip, has icon).',
        inputSchema: {
            type: 'object',
            properties: {
                filter_type: { type: 'string', description: 'Filter by type (novel, comic, chinese_novel)' }
            },
            required: []
        }
    },
    {
        name: 'read_extension',
        description: 'Read the source code of a specific extension script file. Useful for diagnosing bugs.',
        inputSchema: {
            type: 'object',
            properties: {
                extension_name: { type: 'string', description: 'Extension directory name (e.g. ntruyen)' },
                script: { type: 'string', description: 'Script filename (e.g. detail.js, toc.js, plugin.json)' }
            },
            required: ['extension_name', 'script']
        }
    },
    {
        name: 'write_extension_script',
        description: '⚠️ PREREQUISITE: For new extensions, create_extension_flow MUST be called first to scaffold from templates/_demo_* template. Never write scripts from scratch. Always implement real selectors found via inspect/analyze — never use placeholder selectors like SELECTOR_TITLE.',
        inputSchema: {
            type: 'object',
            properties: {
                extension_name: { type: 'string', description: 'Extension directory name (e.g. ntruyen)' },
                script: { type: 'string', description: 'Script filename (e.g. detail.js)' },
                content: { type: 'string', description: 'Full file content to write' }
            },
            required: ['extension_name', 'script', 'content']
        }
    },
    {
        name: 'update_plugin_json',
        description: 'Update fields in an extension\'s plugin.json (e.g. source URL, regexp, description after a domain change).',
        inputSchema: {
            type: 'object',
            properties: {
                extension_name: { type: 'string', description: 'Extension directory name' },
                metadata_patch: { type: 'object', description: 'Key-value pairs to merge into metadata (e.g. { "source": "https://new.com", "regexp": "new\\\\.com/..." })' }
            },
            required: ['extension_name', 'metadata_patch']
        }
    },
{
        name: 'inspect',
        description: 'Run a one-shot DOM inspection on a URL using the VBook device. Returns h1, h2 list, image URLs, link patterns, and optionally tests specific CSS selectors. Replaces the ad-hoc test.js pattern — no files created.',
        inputSchema: {
            type: 'object',
            properties: {
                url: { type: 'string', description: 'URL to inspect on the device' },
                extension_dir: { type: 'string', description: 'Path to any valid extension directory (used as script context)' },
                selectors: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Optional CSS selectors to test explicitly, e.g. ["h1", ".entry-content", "a[href*=\\/chuong\/]"]'
                },
                use_gbk: { type: 'boolean', description: 'Use GBK encoding (for Chinese sites). Default false.' }
            },
            required: ['url', 'extension_dir']
        }
    },
    {
        name: 'read_context',
        description: 'Read a context document from the context/ folder. Use this to read runtime rules, workflow, lessons, or repair guides.',
        inputSchema: {
            type: 'object',
            properties: {
                file: { type: 'string', enum: ['00_BOOTSTRAP.md', '01_runtime.md', '01_runtime_api.md', '02_workflow.md', '03_HARD_SITES.md', '03_lessons.md', '04_demo.md', '05_repair.md', 'Crypto_Bridge.md'], description: 'Context file to read' }
            },
            required: ['file']
        }
    },
    {
        name: 'append_lesson',
        description: 'Append a new lesson to 03_lessons.md after completing a fix. AI should call this to record new patterns learned.',
        inputSchema: {
            type: 'object',
            properties: {
                lesson: { type: 'string', description: 'Markdown content to append as new lesson (## Title\\n\\n**Problem:**...\\n\\n**Solution:**... pattern)' }
            },
            required: ['lesson']
        }
    },
    {
        name: 'update_plugin_version',
        description: 'Increment the version of a plugin in its plugin.json (or main plugin.json). Use after fixes.',
        inputSchema: {
            type: 'object',
            properties: {
                extension_name: { type: 'string', description: 'Extension name in extensions/ (e.g. nhatruyen)' }
            },
            required: ['extension_name']
        }
    },
    {
        name: 'get_plugin_info',
        description: 'Get current plugin info and version. Use to check before updating.',
        inputSchema: {
            type: 'object',
            properties: {
                extension_name: { type: 'string', description: 'Extension name in extensions/ (e.g. nhatruyen)' }
            },
            required: ['extension_name']
        }
    },
    {
        name: 'list_extension_files',
        description: 'List all files in an extension directory. Use to see available scripts before reading/writing.',
        inputSchema: {
            type: 'object',
            properties: {
                extension_name: { type: 'string', description: 'Extension directory name (e.g. ntruyen)' }
            },
            required: ['extension_name']
        }
    },
    {
        name: 'copy_demo',
        description: 'Copy a demo extension template from templates/ (_demo_novel, _demo_comic, _demo_video) to scaffold a new extension. Always use this to create new extensions — never write scripts from scratch. Automatically sets up all required files for the given type.',
        inputSchema: {
            type: 'object',
            properties: {
                name: { type: 'string', description: 'New extension directory name (e.g. truyenfull)' },
                type: { type: 'string', enum: ['novel', 'comic', 'video'], description: 'Template type: novel, comic, or video' }
            },
            required: ['name', 'type']
        }
    },
    {
        name: 'get_dom_tree',
        description: 'Extract a simplified DOM tree (JSON) from a URL using the VBook device. Highly useful for AI to find selectors automatically.',
        inputSchema: {
            type: 'object',
            properties: {
                url: { type: 'string', description: 'URL to extract DOM from' },
                extension_dir: { type: 'string', description: 'Context extension directory (e.g. extensions/ntruyen)' }
            },
            required: ['url', 'extension_dir']
        }
    },
    {
        name: 'get_session_state',
        description: 'Xem session đang ở bước nào, đã inspect URL nào, extension đang làm. GỌI ĐẦU MỖI SESSION.',
        inputSchema: { type: 'object', properties: {}, required: [] }
    },
    {
        name: 'reset_session',
        description: 'Reset state khi bắt đầu làm extension mới hoàn toàn.',
        inputSchema: {
            type: 'object',
            properties: {
                extension_name: { type: 'string', description: 'Tên extension sắp làm' }
            },
            required: []
        }
    }
];

// ─── Tool implementations ─────────────────────────────────────────────────────

async function runCLI(args, cwd) {
    try {
        const { stdout, stderr } = await execFileAsync(
            process.execPath, [CLI, ...args],
            { cwd: cwd || PROJECT_ROOT, timeout: 60000 }
        );
        return { stdout: stdout.trim(), stderr: stderr.trim() };
    } catch (err) {
        return {
            stdout: (err.stdout || '').trim(),
            stderr: (err.stderr || err.message || '').trim(),
            exitCode: err.code
        };
    }
}

function parseJsonOutput(raw) {
    const text = typeof raw === 'string' ? raw : (raw.stdout || '');
    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}');
    if (jsonStart >= 0 && jsonEnd > jsonStart) {
        try {
            return JSON.parse(text.substring(jsonStart, jsonEnd + 1));
        } catch (e) {}
    }
    // Try array
    const arrStart = text.indexOf('[');
    const arrEnd = text.lastIndexOf(']');
    if (arrStart >= 0 && arrEnd > arrStart) {
        try {
            return JSON.parse(text.substring(arrStart, arrEnd + 1));
        } catch (e) {}
    }
    return null;
}

function resolveExtPath(extension_path) {
    if (!extension_path) return PROJECT_ROOT;
    if (path.isAbsolute(extension_path)) return extension_path;
    return path.join(PROJECT_ROOT, extension_path);
}

function resolveExtDir(extension_name) {
    const extensionsBase = path.join(PROJECT_ROOT, 'extensions');
    const target = path.join(extensionsBase, extension_name);
    // Path traversal check
    if (!target.startsWith(extensionsBase)) {
        throw new Error("Invalid extension name (path traversal detected)");
    }
    return target;
}

async function executeTool(name, args) {
    switch (name) {

        case 'bootstrap_session': {
            const beforeStatus = sessionState.getStatus();
            let resumed = true;
            if (args.extension_name) {
                if (beforeStatus.extension_name && beforeStatus.extension_name !== args.extension_name) {
                    sessionState.reset(args.extension_name);
                    resumed = false;
                } else {
                    sessionState.setExtensionName(args.extension_name);
                }
            } else if (beforeStatus.extension_name) {
                sessionState.reset(null);
                resumed = false;
            }

            const docs = {};
            const loaded = [];
            for (const file of BOOTSTRAP_DOCS) {
                const fullPath = path.join(__dirname, 'context', file);
                if (!fs.existsSync(fullPath)) continue;
                const content = fs.readFileSync(fullPath, 'utf8');
                docs[file] = content;
                loaded.push(file);
            }

            sessionState.markBootstrapped(loaded);
            const status = sessionState.getStatus();

            return {
                ok: true,
                message: resumed
                    ? 'Bootstrap loaded. Existing matching session resumed. Next required tool: check_env.'
                    : 'Bootstrap loaded. Previous unrelated session cleared. Next required tool: check_env.',
                next_required: 'check_env',
                resumed,
                docs_loaded: loaded,
                session: status,
                must: [
                    'Run check_env before device-dependent actions.',
                    'Do not guess selectors.',
                    'Use Playwright/Chrome only for discovery; VBook debug is final.',
                    'Do not publish until test_all passes.'
                ],
                workflow: [
                    'bootstrap_session',
                    'check_env',
                    'create/read extension',
                    'diagnose/discover/inspect',
                    'write scripts',
                    'validate',
                    'debug',
                    'test_all',
                    'build/publish'
                ],
                docs
            };
        }

        case 'check_env': {
            const out = await runCLI(['check-env', '--json']);
            const parsed = parseJsonOutput(out.stdout);
            return parsed || { raw: out.stdout, error: out.stderr };
        }

        case 'analyze': {
            const cwd = args.extension_dir
                ? resolveExtPath(args.extension_dir)
                : path.join(PROJECT_ROOT, 'extensions', fs.readdirSync(path.join(PROJECT_ROOT, 'extensions')).filter(d => {
                    return fs.existsSync(path.join(PROJECT_ROOT, 'extensions', d, 'plugin.json'));
                })[0] || '');
            const out = await runCLI(['analyze', args.url, '--json'], cwd);
            const parsed = parseJsonOutput(out.stdout);
            if (!parsed) return { error: out.stderr || out.stdout };
            return parsed;
        }

        case 'node_preflight_probe': {
            const method = (args.method || 'GET').toUpperCase();
            const headers = args.headers || {};
            try {
                const out = await nodePreflight.requestRaw(args.url, {
                    method,
                    headers,
                    body: args.body || '',
                    timeoutMs: args.timeout_ms || 15000,
                    retries: args.retries || 0,
                    followRedirects: args.follow_redirects !== false,
                    maxRedirects: args.max_redirects || 3
                });
                const parsed = nodePreflight.parseBody(out.body, args.expect || 'json');
                const extracted = (parsed.mode === 'json' && args.extract_path)
                    ? nodePreflight.getByPath(parsed.data, args.extract_path)
                    : null;

                const result = {
                    success: out.ok,
                    request: {
                        url: args.url,
                        method,
                        headers,
                        body: args.body || null
                    },
                    response: {
                        status: out.status,
                        status_text: out.statusText,
                        headers: out.headers,
                        parsed_mode: parsed.mode,
                        final_url: out.finalUrl,
                        attempts: out.attempts,
                        trace: out.trace,
                        sample: (parsed.mode === 'text'
                            ? String(parsed.data).substring(0, 1000)
                            : parsed.data),
                        extracted
                    },
                    next: 'If good, call convert_preflight_to_vbook_fetch then test with debug on device.'
                };
                if (args.save_as) {
                    result.saved_spec = nodePreflight.saveSpec(PROJECT_ROOT, args.save_as, result);
                }
                return result;
            } catch (err) {
                return {
                    success: false,
                    error: err && err.message ? err.message : String(err),
                    request: {
                        url: args.url,
                        method,
                        headers
                    }
                };
            }
        }

        case 'convert_preflight_to_vbook_fetch': {
            const script = nodePreflight.generateVbookFetchScript(args.spec || {});
            return {
                success: true,
                script,
                tip: 'Write this to extension src/*.js then run validate/debug/test_all.'
            };
        }

        case 'create_smart': {
            const { smartCreate } = require('./commands/create-smart');
            const { resolveVBookEndpoint } = require('./utils');
            let endpoint;
            try {
                endpoint = await resolveVBookEndpoint({});
            } catch (e) {
                return { success: false, error: e.message + '. Run check_env first.' };
            }
            const ip = endpoint.ip;
            const port = endpoint.port;
            try {
                const result = await smartCreate({
                    name: args.name,
                    source: (args.source || '').replace(/\/$/, ''),
                    type: args.type || 'novel',
                    locale: args.locale || 'vi_VN',
                    tag: args.tag || null,
                    urlHome:   args.url_home,
                    urlDetail: args.url_detail,
                    urlToc:    args.url_toc,
                    urlChap:   args.url_chap,
                    hasSearch: !!args.has_search,
                    hasGenre:  !!args.has_genre,
                    ip, port,
                    jsonMode: true
                });
                return result;
            } catch (err) {
                return { success: false, error: err.message };
            }
        }

        case 'create': {
            const cliArgs = ['create', args.name, '--source', args.source, '--type', args.type || 'novel'];
            if (args.locale) cliArgs.push('--locale', args.locale);
            if (args.tag) cliArgs.push('--tag', args.tag);
            if (args.minimal) cliArgs.push('--minimal');
            const out = await runCLI(cliArgs, PROJECT_ROOT);
            const created = out.exitCode ? false : true;
            return {
                success: created,
                extension_path: path.join(PROJECT_ROOT, 'extensions', args.name),
                output: out.stdout,
                error: out.stderr || null
            };
        }

        case 'create_extension_flow': {
            const siteUrl = args.site_url.replace(/\/$/, '');
            
            // 1. Check Env First
            const envCheck = await runCLI(['check-env', '--json']);
            const envData = parseJsonOutput(envCheck.stdout);
            if (!envData || envData.connected === false) {
                return {
                    status: "blocked_env",
                    message: "❌ VBOOK_IP không hợp lệ hoặc không kết nối được. Hãy cập nhật .env rồi thử lại."
                };
            }

            // 2. Check Answers
            const mandatoryFields = ['name', 'type', 'tag', 'url_listing', 'url_detail', 'url_toc', 'url_chap', 'has_search', 'has_genre'];
            const answers = args.answers || {};
            const missingFields = mandatoryFields.filter(f => answers[f] === undefined || answers[f] === '');

            if (missingFields.length > 0) {
                // Do NOT scaffold yet — we need type to pick the right demo template
                return {
                    status: "need_answers",
                    missing_fields: missingFields,
                    questions: [
                        "Để tạo extension, vui lòng cung cấp các thông tin sau:",
                        "",
                        "1. Tên extension (không dấu, không khoảng trắng, vd: truyenfull):",
                        "2. Loại nội dung? (novel / comic / video)",
                        "3. Tag? (Normal / 18+)",
                        "4. Link trang DANH SÁCH (trang chủ hoặc danh sách thể loại):",
                        "5. Link trang CHI TIẾT một bộ (bất kỳ):",
                        "6. Link trang MỤC LỤC (nếu khác trang chi tiết, để trống nếu giống):",
                        "7. Link trang ĐỌC một chương/tập cụ thể:",
                        "8. Có tìm kiếm (Search) không? [true/false]",
                        "9. Có danh mục thể loại (Genres) không? [true/false]"
                    ].join('\n')
                };
            }

            // 3. All answers present → scaffold from templates/_demo_* template
            const extName = answers.name;
            const extDir = path.join(PROJECT_ROOT, 'extensions', extName);

            if (fs.existsSync(extDir)) {
                return { status: "error", message: `Extension '${extName}' đã tồn tại. Xóa hoặc dùng tên khác.` };
            }

            // Copy correct demo template
            const typeMap = { novel: 'novel', comic: 'comic', video: 'video', chinese_novel: 'novel', translate: 'novel', tts: 'novel' };
            const demoType = typeMap[answers.type] || 'novel';
            const copyResult = await executeTool('copy_demo', { name: extName, type: demoType });
            if (!copyResult.success) {
                return { status: "error", message: `Không thể tạo từ template: ${copyResult.error}` };
            }

            // 4. Update plugin.json with real metadata
            const pluginPath = path.join(extDir, 'plugin.json');
            const plugin = JSON.parse(fs.readFileSync(pluginPath, 'utf8'));
            plugin.metadata.name = extName;
            plugin.metadata.source = siteUrl;
            plugin.metadata.description = `${extName} extension for VBook`;
            plugin.metadata.type = demoType;
            plugin.metadata.tag = answers.tag === '18+' ? '18+' : undefined;

            // Build regexp from source URL domain
            const domain = siteUrl.replace(/https?:\/\//, '').replace(/\//g, '').replace(/\./g, '\\\\.');
            plugin.metadata.regexp = `https?:\\\\/\\\\/(?:www\\\\.)?${domain}\\\\/`;

            // Add optional scripts
            if (!plugin.script) plugin.script = {};
            if (answers.has_search && !plugin.script.search) plugin.script.search = 'search.js';
            if (answers.has_genre && !plugin.script.genre) plugin.script.genre = 'genre.js';
            // Remove genre script if not needed
            if (!answers.has_genre && plugin.script.genre) delete plugin.script.genre;
            if (!answers.has_search && plugin.script.search) delete plugin.script.search;

            fs.writeFileSync(pluginPath, JSON.stringify(plugin, null, 2), 'utf8');

            // 5. Update config.js with real BASE_URL
            const configPath = path.join(extDir, 'src', 'config.js');
            const configContent = `let BASE_URL = "${siteUrl}";\ntry { if (CONFIG_URL) BASE_URL = CONFIG_URL; } catch (e) {}\n`;
            fs.writeFileSync(configPath, configContent, 'utf8');

            return {
                status: "success",
                message: `✅ Extension '${extName}' (${demoType}) đã được tạo từ templates/_demo_${demoType} template!`,
                extension_path: extDir,
                next_steps: [
                    `1. Inspect URL listing:  mcp_vbook_inspect("${answers.url_listing || siteUrl}")`,
                    `2. Inspect URL detail:   mcp_vbook_inspect("${answers.url_detail}")`,
                    `3. Inspect URL chapter:  mcp_vbook_inspect("${answers.url_chap}")`,
                    "4. Implement scripts dựa trên kết quả inspect",
                    "5. validate → debug → test_all → publish"
                ]
            };
        }

        case 'validate': {
            const cwd = resolveExtPath(args.extension_path);
            const out = await runCLI(['validate', '.', '--json'].filter(Boolean), cwd);
            // validate doesn't support --json yet, parse text
            const errors = (out.stdout.match(/❌/g) || []).length;
            const warnings = (out.stdout.match(/⚠️/g) || []).length;
            return {
                success: errors === 0,
                errors,
                warnings,
                output: out.stdout
            };
        }

        case 'debug': {
            const filePath = path.isAbsolute(args.file)
                ? args.file
                : path.join(PROJECT_ROOT, args.file);
            const cliArgs = ['debug', filePath, '--json'];
            if (args.input) cliArgs.push('-in', args.input);
            const extDir = path.dirname(path.dirname(filePath)); // go up from src/
            const out = await runCLI(cliArgs, extDir);
            const parsed = parseJsonOutput(out.stdout);
            if (!parsed) return { success: false, error: out.stderr || out.stdout };
            return parsed;
        }

        case 'test_all': {
            const cwd = resolveExtPath(args.extension_path);
            const cliArgs = ['test-all', '--json'];
            if (args.from_step) cliArgs.push('--from', args.from_step);
            if (args.skip) cliArgs.push('--skip', args.skip);
            const out = await runCLI(cliArgs, cwd);
            const parsed = parseJsonOutput(out.stdout);
            if (!parsed) {
                const failed = out.exitCode !== 0;
                return { success: !failed, error: out.stderr || out.stdout };
            }
            return parsed;
        }

        case 'build': {
            const cwd = resolveExtPath(args.extension_path);
            const cliArgs = ['build'];
            if (args.bump) cliArgs.push('--bump');
            if (args.skip_validate) cliArgs.push('--skip-validate');
            const out = await runCLI(cliArgs, cwd);
            const success = !out.exitCode && out.stdout.includes('Built');
            const sizeMatch = out.stdout.match(/([\d.]+)\s*KB/);
            return {
                success,
                size_kb: sizeMatch ? parseFloat(sizeMatch[1]) : null,
                output: out.stdout,
                error: out.stderr || null
            };
        }

        case 'publish': {
            const cwd = resolveExtPath(args.extension_path);

            // ── Pre-publish checklist ─────────────────────────────────────
            if (!args.skip_validate) {
                const pluginJsonPath = path.join(cwd, 'plugin.json');
                const checkErrors = [];

                if (fs.existsSync(pluginJsonPath)) {
                    const plugin = JSON.parse(fs.readFileSync(pluginJsonPath, 'utf8'));
                    const type = (plugin.metadata && plugin.metadata.type) || '';
                    const scripts = (plugin.metadata && plugin.metadata.script) || {};
                    const srcDir = path.join(cwd, 'src');

                    // 1. All scripts in plugin.json must have corresponding files
                    Object.keys(scripts).forEach(function(key) {
                        const file = scripts[key];
                        if (!fs.existsSync(path.join(srcDir, file))) {
                            checkErrors.push(`Missing file: src/${file} (declared as "${key}" in plugin.json)`);
                        }
                    });

                    // 2. Type-specific required files
                    if (type === 'video') {
                        if (!scripts.track) checkErrors.push('Video extension thiếu "track" trong plugin.json script');
                        if (!scripts.chap) checkErrors.push('Video extension thiếu "chap" trong plugin.json script');
                        if (scripts.track && !fs.existsSync(path.join(srcDir, 'track.js'))) {
                            checkErrors.push('Missing file: src/track.js (required for video type)');
                        }
                    }

                    // 3. config.js must use let + CONFIG_URL
                    const configPath = path.join(srcDir, 'config.js');
                    if (fs.existsSync(configPath)) {
                        const configContent = fs.readFileSync(configPath, 'utf8');
                        if (!configContent.includes('CONFIG_URL')) {
                            checkErrors.push('config.js thiếu CONFIG_URL override pattern: try { if (CONFIG_URL) BASE_URL = CONFIG_URL; } catch(e) {}');
                        }
                        if (configContent.includes('const BASE_URL')) {
                            checkErrors.push('config.js phải dùng "let BASE_URL" không phải "const BASE_URL"');
                        }
                    } else {
                        checkErrors.push('Thiếu src/config.js — bắt buộc phải có');
                    }

                    // 4. page.js must exist
                    if (!fs.existsSync(path.join(srcDir, 'page.js'))) {
                        checkErrors.push('Thiếu src/page.js — bắt buộc phải có (trả về [url] nếu không có phân trang)');
                    }
                }

                if (checkErrors.length > 0) {
                    return {
                        success: false,
                        blocked: true,
                        reason: '❌ Pre-publish checklist FAILED — fix errors trước khi publish',
                        errors: checkErrors,
                        tip: 'Dùng skip_validate: true để bỏ qua (không khuyến khích)'
                    };
                }
            }
            // ─────────────────────────────────────────────────────────────

            const cliArgs = ['publish'];
            if (args.skip_validate) cliArgs.push('--skip-validate');
            const out = await runCLI(cliArgs, cwd);
            const success = !out.exitCode && (out.stdout.includes('Published') || out.stdout.includes('✅'));

            const versionMatch = out.stdout.match(/Version bumped to (\d+)/);
            const countMatch = out.stdout.match(/(\d+) extensions in registry/);

            return {
                success,
                new_version: versionMatch ? parseInt(versionMatch[1]) : null,
                registry_count: countMatch ? parseInt(countMatch[1]) : null,
                output: out.stdout,
                error: out.stderr || null
            };
        }

        case 'publish_my_extensions': {
            const cliArgs = ['publish', '--my'];
            if (args.skip_validate) cliArgs.push('--skip-validate');
            // Execute from project root since it scans all extensions
            const out = await runCLI(cliArgs, PROJECT_ROOT);
            const success = !out.exitCode;

            const builtMatch = out.stdout.match(/Built: (\d+)/);
            const countMatch = out.stdout.match(/Updated .* with (\d+) extensions/);

            return {
                success,
                built_count: builtMatch ? parseInt(builtMatch[1]) : 0,
                registry_count: countMatch ? parseInt(countMatch[1]) : null,
                output: out.stdout,
                error: out.stderr || null
            };
        }

        case 'install': {
            const cwd = resolveExtPath(args.extension_path);
            const cliArgs = ['install'];
            const out = await runCLI(cliArgs, cwd);
            const success = !out.exitCode && out.stdout.includes('successfully');
            
            return {
                success,
                output: out.stdout,
                error: out.stderr || null
            };
        }

        case 'list_extensions': {
            const { scanExtensions } = require('./lib/plugin-list');
            const opts = {};
            if (args.filter_type) opts.filterType = args.filter_type;
            const exts = scanExtensions(opts);
            return {
                count: exts.length,
                extensions: exts.map(e => ({
                    dir: e.dirName,
                    name: e.metadata.name,
                    version: e.metadata.version,
                    type: e.metadata.type,
                    locale: e.metadata.locale,
                    source: e.metadata.source,
                    has_zip: e.hasZip,
                    has_src: e.hasSrc
                }))
            };
        }

        case 'read_extension': {
            const extDir = resolveExtDir(args.extension_name);
            let filePath;
            if (args.script === 'plugin.json') {
                filePath = path.join(extDir, 'plugin.json');
            } else {
                filePath = path.join(extDir, 'src', args.script);
            }
            if (!fs.existsSync(filePath)) {
                return { error: `File not found: ${filePath}` };
            }
            // Path traversal check for script filename
            if (!filePath.startsWith(extDir)) {
                return { error: "Invalid script name (path traversal detected)" };
            }
            const content = fs.readFileSync(filePath, 'utf8');
            return { extension: args.extension_name, script: args.script, content };
        }

        case 'write_extension_script': {
            const extDir = resolveExtDir(args.extension_name);
            const srcDir = path.join(extDir, 'src');
            if (!fs.existsSync(srcDir)) {
                return { error: `Extension not found: ${args.extension_name}` };
            }
            const filePath = path.join(srcDir, args.script);
            // Path traversal check for script filename
            if (!filePath.startsWith(srcDir)) {
                return { error: "Invalid script name (path traversal detected)" };
            }
            fs.writeFileSync(filePath, args.content, 'utf8');
            return { success: true, path: filePath, bytes: Buffer.byteLength(args.content) };
        }

        case 'update_plugin_json': {
            const extDir = resolveExtDir(args.extension_name);
            const pluginPath = path.join(extDir, 'plugin.json');
            if (!fs.existsSync(pluginPath)) {
                return { error: `plugin.json not found for: ${args.extension_name}` };
            }
            const current = JSON.parse(fs.readFileSync(pluginPath, 'utf8'));
            current.metadata = { ...current.metadata, ...args.metadata_patch };
            fs.writeFileSync(pluginPath, JSON.stringify(current, null, 2), 'utf8');
            return { success: true, metadata: current.metadata };
        }

        case 'inspect': {
            // Resolve extension context directory
            const inspectCwd = args.extension_dir
                ? resolveExtPath(args.extension_dir)
                : (() => {
                    const extDirs = fs.readdirSync(path.join(PROJECT_ROOT, 'extensions'))
                        .filter(d => fs.existsSync(path.join(PROJECT_ROOT, 'extensions', d, 'plugin.json')));
                    return path.join(PROJECT_ROOT, 'extensions', extDirs[0] || '');
                })();

            const htmlCall = args.use_gbk ? 'res.html("gbk")' : 'res.html()';

            // Build selector tests
            const selectors = args.selectors || [];
            const selectorCode = selectors.map((sel, i) => {
                const safeKey = 's' + i;
                return [
                    `var el_${safeKey} = doc.select(${JSON.stringify(sel)});`,
                    `result.selectors[${JSON.stringify(sel)}] = {`,
                    `  found: el_${safeKey}.size() > 0,`,
                    `  count: el_${safeKey}.size() + "",`,
                    `  text_preview: el_${safeKey}.size() > 0 ? (el_${safeKey}.first().text().substring(0, 80) + "") : "",`,
                    `  attr_src: el_${safeKey}.size() > 0 ? (el_${safeKey}.first().attr("src") + "") : "",`,
                    `  attr_href: el_${safeKey}.size() > 0 ? (el_${safeKey}.first().attr("href") + "") : ""`,
                    `};`
                ].join('\n');
            }).join('\n');

            const inspectScript = `
function execute(url) {
    var res = fetch(url);
    if (!res.ok) return Response.error("fetch failed: " + res.status);
    var doc = res.${htmlCall.replace('res.', '')};

    var h1El = doc.select("h1").first();
    var h1 = (h1El ? h1El.text() : "") + "";

    var h2List = [];
    doc.select("h2").forEach(function(el) { h2List.push(el.text() + ""); });

    var imgs = [];
    var imgCount = 0;
    doc.select("img").forEach(function(el) {
        if (imgCount >= 5) return;
        imgs.push((el.attr("data-src") || el.attr("src") || "") + "");
        imgCount++;
    });

    var links = [];
    var linkCount = 0;
    doc.select("a[href]").forEach(function(el) {
        if (linkCount >= 10) return;
        var href = (el.attr("href") || "") + "";
        if (href.indexOf("http") === 0 || href.indexOf("/") === 0) {
            links.push(href);
            linkCount++;
        }
    });

    var result = {
        h1: h1,
        h2_list: h2List.slice(0, 5),
        images: imgs,
        links_sample: links,
        selectors: {}
    };

${selectorCode}

    return Response.success(result);
}`;

            // Write temp script, debug it, then delete
            const tmpFile = path.join(inspectCwd, 'src', '_inspect_tmp.js');
            fs.writeFileSync(tmpFile, inspectScript, 'utf8');

            let inspectResult;
            try {
                const out = await runCLI(['debug', tmpFile, '-in', args.url, '--json'], inspectCwd);
                const parsed = parseJsonOutput(out.stdout);
                inspectResult = parsed || { success: false, error: out.stderr || out.stdout };
            } finally {
                try { fs.unlinkSync(tmpFile); } catch (_) {}
            }

            return inspectResult;
        }
        
        case 'get_dom_tree': {
            const cwd = resolveExtPath(args.extension_dir);
            const scriptPath = path.join(PROJECT_ROOT, 'vbook-tool', 'scripts', 'dom-tree.js');
            const tmpFile = path.join(cwd, 'src', '_dom_tree_tmp.js');
            
            // Ensure src directory exists
            if (!fs.existsSync(path.join(cwd, 'src'))) {
                fs.mkdirSync(path.join(cwd, 'src'), { recursive: true });
            }

            fs.copyFileSync(scriptPath, tmpFile);
            
            let treeResult;
            try {
                const out = await runCLI(['debug', tmpFile, '-in', args.url, '--json'], cwd);
                const parsed = parseJsonOutput(out.stdout);
                treeResult = parsed || { success: false, error: out.stderr || out.stdout };
            } finally {
                try { fs.unlinkSync(tmpFile); } catch (_) {}
            }
            return treeResult;
        }

        case 'read_context': {
            const ctxFile = path.join(__dirname, 'context', args.file);
            if (!fs.existsSync(ctxFile)) {
                return { error: `Context file not found: ${args.file}` };
            }
            const content = fs.readFileSync(ctxFile, 'utf8');
            return { file: args.file, content };
        }

        case 'append_lesson': {
            const lessonFile = path.join(__dirname, 'context', '03_lessons.md');
            const existing = fs.readFileSync(lessonFile, 'utf8');
            const newContent = existing + '\n\n---\n\n' + args.lesson;
            fs.writeFileSync(lessonFile, newContent, 'utf8');
            return { success: true, file: '03_lessons.md' };
        }

        case 'update_plugin_version': {
            const extDir = resolveExtDir(args.extension_name);
            const pluginJsonPath = path.join(extDir, 'plugin.json');
            if (!fs.existsSync(pluginJsonPath)) {
                return { error: `plugin.json not found in ${args.extension_name}` };
            }
            const pluginJson = JSON.parse(fs.readFileSync(pluginJsonPath, 'utf8'));
            if (!pluginJson.metadata || !pluginJson.metadata.version) {
                return { error: `No version found in plugin.json` };
            }
            const newVersion = pluginJson.metadata.version + 1;
            pluginJson.metadata.version = newVersion;
            fs.writeFileSync(pluginJsonPath, JSON.stringify(pluginJson, null, 2) + '\n', 'utf8');
            return { success: true, extension: args.extension_name, version: newVersion };
        }

        case 'get_plugin_info': {
            const extDir = resolveExtDir(args.extension_name);
            const pluginJsonPath = path.join(extDir, 'plugin.json');
            if (!fs.existsSync(pluginJsonPath)) {
                return { error: `plugin.json not found in ${args.extension_name}` };
            }
            const pluginJson = JSON.parse(fs.readFileSync(pluginJsonPath, 'utf8'));
            return {
                name: pluginJson.metadata?.name || args.extension_name,
                version: pluginJson.metadata?.version || '?',
                source: pluginJson.metadata?.source || '',
                author: pluginJson.metadata?.author || '',
                type: pluginJson.metadata?.type || ''
            };
        }

        case 'list_extension_files': {
            const extDir = resolveExtDir(args.extension_name);
            if (!fs.existsSync(extDir)) {
                return { error: `Extension not found: ${args.extension_name}` };
            }
            const files = [];
            const entries = fs.readdirSync(extDir);
            for (const entry of entries) {
                const fullPath = path.join(extDir, entry);
                const stat = fs.statSync(fullPath);
                if (stat.isDirectory()) {
                    const subEntries = fs.readdirSync(fullPath);
                    for (const sub of subEntries) {
                        files.push(entry + '/' + sub);
                    }
                } else {
                    files.push(entry);
                }
            }
            return { extension: args.extension_name, files };
        }

        case 'copy_demo': {
            const demoMap = { novel: '_demo_novel', comic: '_demo_comic', video: '_demo_video' };
            const demoType = demoMap[args.type] || '_demo_novel';
            const demoDir = path.join(TEMPLATES_DIR, demoType);
            const newDir = path.join(PROJECT_ROOT, 'extensions', args.name);
            
            if (!fs.existsSync(demoDir)) {
                return { error: `Demo template not found: templates/${demoType}` };
            }
            if (fs.existsSync(newDir)) {
                return { error: `Extension already exists: ${args.name}` };
            }
            
            // Copy demo folder recursively
            function copyDir(src, dest) {
                fs.mkdirSync(dest, { recursive: true });
                const entries = fs.readdirSync(src);
                for (const entry of entries) {
                    const srcPath = path.join(src, entry);
                    const destPath = path.join(dest, entry);
                    const stat = fs.statSync(srcPath);
                    if (stat.isDirectory()) {
                        copyDir(srcPath, destPath);
                    } else {
                        fs.copyFileSync(srcPath, destPath);
                    }
                }
            }
            
            copyDir(demoDir, newDir);
            
            // Update plugin.json with new name
            const pluginPath = path.join(newDir, 'plugin.json');
            let plugin = JSON.parse(fs.readFileSync(pluginPath, 'utf8'));
            plugin.metadata.name = args.name;
            fs.writeFileSync(pluginPath, JSON.stringify(plugin, null, 2), 'utf8');
            
            return { success: true, extension: args.name, type: args.type };
        }

        case 'get_session_state':
            return sessionState.getStatus();

        case 'reset_session':
            sessionState.reset(args.extension_name);
            return {
                success: true,
                message: `Session reset. Extension: ${args.extension_name || 'chưa đặt tên'}`,
                state: sessionState.getStatus()
            };

        default:
            throw new Error(`Unknown tool: ${name}`);
    }
}

// ─── State update + Safe execution wrapper ───────────────────────────────────

function updateStateAfterTool(name, args, result) {
    switch(name) {
        case 'check_env':
            if (result.ok) {
                sessionState.setEnvOk(true);
                sessionState.advanceTo('env_checked');
            }
            break;
        case 'inspect':
        case 'get_dom_tree':
            if (result.success !== false) {
                sessionState.addInspectedUrl(args.url, result.data || {});
                if (sessionState.hasMinimumInspected()) {
                    sessionState.advanceTo('inspected');
                }
            }
            break;
        case 'create_extension_flow':
            if (result.status === 'success') {
                var extName = (args.answers && args.answers.name) || null;
                if (extName) sessionState.setExtensionName(extName);
                // Set required scripts dựa trên type
                var type = (args.answers && args.answers.type) || 'novel';
                var required = ['detail.js', 'toc.js', 'chap.js'];
                if (type === 'video') required.push('track.js');
                sessionState.setRequiredScripts(required);
            }
            break;
        case 'write_extension_script':
            if (!result.blocked) sessionState.advanceTo('code_written');
            break;
        case 'validate':
            if (result.errors === 0) sessionState.advanceTo('validated');
            break;
        case 'debug':
            if (result.success) {
                var scriptName = require('path').basename(args.file || '');
                sessionState.markDebuggedScript(scriptName);
                // Advance ngay nếu đã debug ít nhất 3 scripts cốt lõi
                // thay vì chờ allScriptsDebugged() (vì required_scripts có thể chưa set)
                if (sessionState.allScriptsDebugged() || 
                    sessionState.getStatus().debugged_scripts.length >= 3) {
                    sessionState.advanceTo('debugged');
                }
            }
            break;
        case 'test_all':
            if (result.success) sessionState.advanceTo('tested');
            break;
        case 'publish':
        case 'publish_my_extensions':
            if (result.success) sessionState.advanceTo('published');
            break;
    }
}

async function executeToolSafe(name, args) {
    // 1. Check gate
    var gateResult = gate.checkGate(name, sessionState.getStatus());
    if (gateResult.blocked) {
        sessionState.logViolation('Gate blocked: ' + name + ' (requires ' + gateResult.required_step + ')');
        return gateResult;
    }

    // 2. Special pre-check: reject code with violations before writing file
    if (name === 'write_extension_script') {
        var content = args.content || '';
        var check = detector.runAll(content);
        if (!check.ok) {
            sessionState.logViolation('write_extension_script rejected: ' + check.summary);
            return {
                blocked: true,
                reason: '🚫 CODE REJECTED — phát hiện vi phạm trước khi ghi file.',
                rhino_violations: check.rhino_violations,
                placeholder_violations: check.placeholder_violations,
                missing_execute: check.missing_execute,
                total_violations: check.total_violations,
                fix_required: true
            };
        }
    }

    // 3. Execute original tool
    var result = await executeTool(name, args);

    // 4. Update state based on result
    updateStateAfterTool(name, args, result);

    // 5. Wrap response with hints
    return responseWrapper.wrap(name, result, sessionState.getStatus());
}

// ─── MCP message router ───────────────────────────────────────────────────────

function handleMessage(msg) {
    const { id, method, params } = msg;

    // initialize
    if (method === 'initialize') {
        sendResult(id, {
            protocolVersion: '2024-11-05',
            capabilities: { tools: {} },
            serverInfo: { name: 'vbook-mcp', version: '1.0.0' }
        });
        return;
    }

    // initialized notification (no response needed)
    if (method === 'notifications/initialized' || method === 'initialized') {
        return;
    }

    // list tools
    if (method === 'tools/list') {
        sendResult(id, { tools: TOOLS });
        return;
    }

    // call tool
    if (method === 'tools/call') {
        const toolName = params && params.name;
        const toolArgs = (params && params.arguments) || {};

        if (!toolName) {
            sendError(id, -32602, 'Missing tool name');
            return;
        }

        executeToolSafe(toolName, toolArgs)
            .then((result) => {
                sendResult(id, {
                    content: [{ type: 'text', text: JSON.stringify(result, null, 2) }]
                });
            })
            .catch((err) => {
                sendResult(id, {
                    content: [{ type: 'text', text: JSON.stringify({ error: err.message }) }],
                    isError: true
                });
            });
        return;
    }

    // unknown method
    if (id !== undefined && id !== null) {
        sendError(id, -32601, `Method not found: ${method}`);
    }
}

// Keep process alive
process.on('SIGTERM', () => process.exit(0));
process.on('SIGINT', () => process.exit(0));
process.stderr.write('[vbook-mcp] Server started (stdio)\n');
