/**
 * DEBUG COMMAND — Send a single script to the VBook device for testing
 */
const path = require('path');
const fs = require('fs');
const stringArgv = require('string-argv').default;
const { sendModernRequest, resolveVBookEndpoint } = require('../utils');
const { getPluginInfo } = require('../lib/plugin-info');
const c = require('../lib/colors');

function register(program) {
    program.command('debug')
        .description('Debug a script on the device')
        .argument('<file>', 'Path to the script (e.g. src/home.js)')
        .option('-i, --ip <ip>', 'Device IP address')
        .option('-p, --port <port>', 'Device Port', '8080')
        .option('-in, --input <input>', 'Test input string')
        .option('--json', 'Output result as JSON (for AI parsing)')
        .option('-v, --verbose', 'Verbose output')
        .action(async (file, options) => {
            const jsonMode = options.json || false;
            try {
                const fullPath = path.resolve(file);
                if (!fs.existsSync(fullPath)) {
                    return console.error(c.error(`File not found: ${fullPath}`));
                }

                const info = getPluginInfo(path.dirname(fullPath));
                const endpoint = await resolveVBookEndpoint({ ip: options.ip, port: options.port });
                const ip = endpoint.ip;
                const port = endpoint.port;
                const verbose = options.verbose || process.env.VERBOSE === 'true';

                console.log(c.step('DEBUG', `Target: ${c.bold(ip + ':' + port)}`));

                const inputStr = options.input || "";
                const input = inputStr ? stringArgv(inputStr) : [];

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

                let iconBase64 = "";
                const iconPath = path.join(info.root, 'icon.png');
                if (fs.existsSync(iconPath)) {
                    iconBase64 = `data:image/*;base64,${fs.readFileSync(iconPath).toString('base64')}`;
                    info.json.metadata.icon = iconBase64;
                }
                const srcObject = readSourceMapSync(path.join(info.root, 'src'));
                const payload = {
                    plugin: JSON.stringify(info.json),
                    icon: iconBase64,
                    src: JSON.stringify(srcObject),
                    input: JSON.stringify({
                        script: path.basename(file),
                        vararg: input
                    })
                };

                if (!jsonMode) {
                    console.log(c.step('TEST', `Sending ${c.bold(path.basename(file))}...`));
                }
                const start = Date.now();
                const result = await sendModernRequest(ip, port, 'extension/test', payload, verbose);
                const elapsed = Date.now() - start;
                const timeStr = (elapsed / 1000).toFixed(1);

                if (jsonMode) {
                    // Structured output for AI parsing
                    const structured = {
                        success: !result.exception,
                        time: `${timeStr}s`,
                        log: result.log || null,
                        exception: result.exception || null,
                        data: result.data !== undefined ? result.data : (result.result || null)
                    };
                    console.log(JSON.stringify(structured, null, 2));
                } else {
                    if (result && result.log) {
                        console.log(c.yellow(`\n[LOG FROM DEVICE]`));
                        let logStr = Array.isArray(result.log) ? result.log.join('\n') : (typeof result.log === 'string' ? result.log : JSON.stringify(result.log, null, 2));
                        logStr = logStr.replace(/\\n/g, '\n').replace(/\r\n/g, '\n').replace(/\n$/, '');
                        if (logStr) console.log(logStr);
                    }
                    if (result && result.result) {
                        try {
                            let parsedResult = result.result;
                            if (typeof parsedResult === 'string') {
                                try { parsedResult = JSON.parse(parsedResult); } catch(e) {}
                            }
                            console.log(c.green('\n[RESULT]'), JSON.stringify(parsedResult, null, 2));
                        } catch (e) {
                            console.log(c.green('\n[RESULT]'), result.result);
                        }
                    } else if (result && result.exception) {
                        console.warn(c.red('\n[EXCEPTION FROM DEVICE]'));
                        console.warn(typeof result.exception === 'string' ? result.exception.replace(/\\n/g, '\n') : JSON.stringify(result.exception, null, 2));
                    } else if (result && result.data) {
                        let dataStr = typeof result.data === 'string' ? result.data : JSON.stringify(result.data, null, 2);
                        console.log(c.green('\n[RESULT DATA]\n'), dataStr);
                    } else {
                        console.log(c.blue('\n[RESPONSE]\n'), JSON.stringify(result, null, 2));
                    }
                    console.log(c.dim(`\nCompleted in ${timeStr}s`));
                }

            } catch (error) {
                if (options.json) {
                    console.log(JSON.stringify({ success: false, exception: error.message, data: null }));
                } else {
                    console.error(c.error(error.message));
                }
            }
        });
}

module.exports = { register };

