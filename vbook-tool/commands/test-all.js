/**
 * TEST-ALL COMMAND — One-click full-flow test: home → gen → detail → [page] → toc → chap
 * Modern API version — mirrors `runOneclickTest` logic from extension.js
 */
const path = require('path');
const fs = require('fs');
const { sendModernRequest, resolveVBookEndpoint } = require('../utils');
const { getPluginInfo } = require('../lib/plugin-info');
const c = require('../lib/colors');

function register(program) {
    program.command('test-all')
        .description('One-click test (home → gen → detail → toc → chap) via Modern API')
        .option('-i, --ip <ip>', 'Device IP address')
        .option('-p, --port <port>', 'Device Port', '8080')
        .option('--from <step>', 'Start from step (home|gen|detail|toc|chap)', 'home')
        .option('--skip <steps>', 'Steps to skip, comma-separated (e.g. home,gen)')
        .option('--json', 'Output results as JSON (for AI parsing)')
        .option('-v, --verbose', 'Verbose output')
        .action(async (options) => {
            const totalStart = Date.now();
            const jsonMode = options.json || false;

            try {
                const info = getPluginInfo();
                const endpoint = await resolveVBookEndpoint({ ip: options.ip, port: options.port });
                const ip = endpoint.ip;
                const port = endpoint.port;
                const verbose = options.verbose || process.env.VERBOSE === 'true';
                const skipSet = new Set((options.skip || '').split(',').filter(Boolean));
                const fromStep = options.from || 'home';
                const stepOrder = ['home', 'gen', 'detail', 'page', 'toc', 'chap'];
                const fromIndex = stepOrder.indexOf(fromStep);

                if (!jsonMode) {
                    console.log(c.bold(`\n🧪 Test-All: ${c.cyan(info.name)}`));
                    console.log(c.dim(`   Target: ${ip}:${port} | From: ${fromStep}\n`));
                }

                // --- Build payload for Modern API (mirrors createPayload in extension.js) ---
                const readSourceMapSync = (srcDir, prefix = '') => {
                    if (!fs.existsSync(srcDir)) return {};
                    const entries = fs.readdirSync(srcDir, { withFileTypes: true });
                    const output = {};
                    for (const entry of entries) {
                        const fp = path.join(srcDir, entry.name);
                        const relPath = prefix ? `${prefix}/${entry.name}` : entry.name;
                        if (entry.isDirectory()) {
                            Object.assign(output, readSourceMapSync(fp, relPath));
                        } else {
                            output[relPath] = fs.readFileSync(fp, 'utf8');
                        }
                    }
                    return output;
                };

                let iconBase64 = '';
                const iconPath = path.join(info.root, 'icon.png');
                if (fs.existsSync(iconPath)) {
                    iconBase64 = `data:image/*;base64,${fs.readFileSync(iconPath).toString('base64')}`;
                    info.json.metadata.icon = iconBase64;
                }
                const srcObject = readSourceMapSync(path.join(info.root, 'src'));
                const basePayload = {
                    plugin: JSON.stringify(info.json),
                    icon: iconBase64,
                    src: JSON.stringify(srcObject)
                };

                // --- Run a single script via Modern API (mirrors runModernScript in extension.js) ---
                const runScript = async (scriptName, inputArgs) => {
                    const stepStart = Date.now();
                    const scriptPath = path.join(info.root, 'src', scriptName);
                    if (!fs.existsSync(scriptPath)) {
                        throw new Error(`${scriptName} not found in src/`);
                    }

                    const payload = {
                        ...basePayload,
                        input: JSON.stringify({ script: scriptName, vararg: inputArgs })
                    };

                    if (!jsonMode) {
                        process.stdout.write(
                            c.cyan(`  ▶ ${scriptName}`) +
                            c.dim(` (input: ${JSON.stringify(inputArgs).substring(0, 80)})... `)
                        );
                    }

                    const res = await sendModernRequest(ip, port, 'extension/test', payload, verbose);
                    const elapsed = ((Date.now() - stepStart) / 1000).toFixed(1);

                    // Normalize response (mirrors extension.js runModernScript normalization)
                    const normalized = {
                        log: res.log || '',
                        exception: res.exception || (res.code && res.code !== 200 ? res.message : ''),
                        data: res.data !== undefined ? res.data : res,
                        _time: `${elapsed}s`
                    };

                    if (!jsonMode) {
                        if (normalized.exception) {
                            console.log(c.red(`FAIL`) + c.dim(` ${elapsed}s`));
                            if (normalized.log) console.log(c.yellow('    [LOG]'), normalized.log);
                            throw new Error(`Exception in ${scriptName}: ${normalized.exception}`);
                        }
                        if (normalized.log) {
                            const logStr = Array.isArray(normalized.log)
                                ? normalized.log.join('\n')
                                : String(normalized.log);
                            if (logStr.trim()) console.log(c.yellow(`\n    [LOG]`), logStr.replace(/\\n/g, '\n'));
                        }
                        console.log(c.green(`OK`) + c.dim(` ${elapsed}s`));
                    } else if (normalized.exception) {
                        throw new Error(`Exception in ${scriptName}: ${normalized.exception}`);
                    }

                    return normalized;
                };

                const results = {};

                // ─── STEP 1: home ──────────────────────────────────────────────────
                if (fromIndex <= 0 && !skipSet.has('home')) {
                    const homeWrap = await runScript('home.js', []);
                    results.home = homeWrap;
                    var homeData = homeWrap.data && homeWrap.data.data
                        ? homeWrap.data.data
                        : (Array.isArray(homeWrap.data) ? homeWrap.data : null);
                    if (!homeData || !homeData.length) throw new Error('home.js: No data returned');
                    if (!jsonMode) console.log(c.dim(`    → ${homeData.length} items`));
                } else if (!jsonMode) {
                    console.log(c.dim('  ⏭ home.js (skipped)'));
                }

                // ─── STEP 2: gen (or custom script from home item) ─────────────────
                if (fromIndex <= 1 && !skipSet.has('gen') && homeData) {
                    const firstItem = homeData[0];
                    const genScriptName = firstItem.script || 'gen.js';
                    const genWrap = await runScript(genScriptName, [firstItem.input]);
                    results.gen = genWrap;
                    var genData = genWrap.data && genWrap.data.data
                        ? genWrap.data.data
                        : (Array.isArray(genWrap.data) ? genWrap.data : null);
                    if (!genData || !genData.length) throw new Error(`${genScriptName}: No data returned`);
                    if (!jsonMode) console.log(c.dim(`    → ${genData.length} items`));
                } else if (!jsonMode) {
                    console.log(c.dim('  ⏭ gen.js (skipped)'));
                }

                // ─── STEP 3: detail ────────────────────────────────────────────────
                var detailUrl = null;
                if (fromIndex <= 2 && !skipSet.has('detail') && genData) {
                    const firstBook = genData[0];
                    detailUrl = firstBook.link || firstBook.url || '';
                    // Normalize URL (mirrors extension.js logic)
                    if (firstBook.host && detailUrl && !detailUrl.startsWith('http')) {
                        const base = firstBook.host.endsWith('/') ? firstBook.host : firstBook.host + '/';
                        detailUrl = base + (detailUrl.startsWith('/') ? detailUrl.substring(1) : detailUrl);
                    }
                    const detailWrap = await runScript('detail.js', [detailUrl]);
                    results.detail = detailWrap;
                    var detailData = detailWrap.data && detailWrap.data.data
                        ? detailWrap.data.data
                        : detailWrap.data;
                    if (!jsonMode) console.log(c.dim(`    → ${detailData && detailData.name ? detailData.name : '(no name)'}`));
                } else if (!jsonMode) {
                    console.log(c.dim('  ⏭ detail.js (skipped)'));
                }

                // ─── STEP 4: page (optional — mirrors extension.js) ────────────────
                var tocInput = detailUrl;
                if (fromIndex <= 3 && !skipSet.has('page') && detailUrl) {
                    const pageJsPath = path.join(info.root, 'src', 'page.js');
                    if (fs.existsSync(pageJsPath)) {
                        const pageWrap = await runScript('page.js', [detailUrl]);
                        results.page = pageWrap;
                        const pageData = pageWrap.data && pageWrap.data.data
                            ? pageWrap.data.data
                            : (Array.isArray(pageWrap.data) ? pageWrap.data : null);
                        if (pageData && pageData.length) {
                            const firstPage = pageData[0];
                            tocInput = typeof firstPage === 'string' ? firstPage : (firstPage.url || firstPage.link || detailUrl);
                            if (!jsonMode) console.log(c.dim(`    → ${pageData.length} pages, toc from: ${tocInput.substring(0, 60)}`));
                        }
                    }
                }

                // ─── STEP 5: toc ───────────────────────────────────────────────────
                var tocData = null;
                if (fromIndex <= 4 && !skipSet.has('toc') && tocInput) {
                    const tocWrap = await runScript('toc.js', [tocInput]);
                    results.toc = tocWrap;
                    tocData = tocWrap.data && tocWrap.data.data
                        ? tocWrap.data.data
                        : (Array.isArray(tocWrap.data) ? tocWrap.data : null);
                    if (!tocData || !tocData.length) throw new Error('toc.js: No chapters returned');
                    if (!jsonMode) console.log(c.dim(`    → ${tocData.length} chapters`));
                } else if (!jsonMode) {
                    console.log(c.dim('  ⏭ toc.js (skipped)'));
                }

                // ─── STEP 6: chap ──────────────────────────────────────────────────
                if (fromIndex <= 5 && !skipSet.has('chap') && tocData) {
                    const firstChap = tocData[0];
                    let chapUrl = firstChap.url || firstChap.link || '';
                    if (firstChap.host && chapUrl && !chapUrl.startsWith('http')) {
                        const base = firstChap.host.endsWith('/') ? firstChap.host : firstChap.host + '/';
                        chapUrl = base + (chapUrl.startsWith('/') ? chapUrl.substring(1) : chapUrl);
                    }
                    const chapWrap = await runScript('chap.js', [chapUrl]);
                    results.chap = chapWrap;
                    const chapLen = chapWrap.data ? String(chapWrap.data).length : 0;
                    if (!jsonMode) console.log(c.dim(`    → ${chapLen} chars`));
                } else if (!jsonMode) {
                    console.log(c.dim('  ⏭ chap.js (skipped)'));
                }

                const totalElapsed = ((Date.now() - totalStart) / 1000).toFixed(1);

                if (jsonMode) {
                    console.log(JSON.stringify({ success: true, elapsed: `${totalElapsed}s`, steps: Object.keys(results) }, null, 2));
                } else {
                    console.log(c.bold(c.green(`\n✅ Test completed successfully in ${totalElapsed}s`)));
                }

            } catch (error) {
                const totalElapsed = ((Date.now() - totalStart) / 1000).toFixed(1);
                if (options.json) {
                    console.log(JSON.stringify({ success: false, elapsed: `${totalElapsed}s`, error: error.message }));
                } else {
                    console.error(c.bold(c.red(`\n❌ Test failed after ${totalElapsed}s: ${error.message}`)));
                }
                process.exit(1);
            }
        });
}

module.exports = { register };
