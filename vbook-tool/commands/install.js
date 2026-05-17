/**
 * INSTALL COMMAND — Install extension to the VBook device
 */
const path = require('path');
const fs = require('fs');
const { sendRequest, resolveVBookEndpoint } = require('../utils');
const { getPluginInfo } = require('../lib/plugin-info');
const { buildRequestHeaders } = require('../lib/server');
const c = require('../lib/colors');

function register(program) {
    program.command('install')
        .description('Install the extension on the device')
        .option('-i, --ip <ip>', 'Device IP address')
        .option('-p, --port <port>', 'Device Port', '8080')
        .option('-v, --verbose', 'Verbose output')
        .action(async (options) => {
            try {
                const info = getPluginInfo();
                const endpoint = await resolveVBookEndpoint({ ip: options.ip, port: options.port });
                const ip = endpoint.ip;
                const port = endpoint.port;
                const verbose = options.verbose || process.env.VERBOSE === 'true';

                const iconPath = path.join(info.root, 'icon.png');
                if (!fs.existsSync(iconPath)) throw new Error("icon.png not found");

                console.log(c.step('INSTALL', `${c.bold(info.name)} → ${ip}:${port}`));

                const metadata = { ...info.json.metadata };
                if (metadata.encrypt) delete metadata.encrypt;

                const data = {
                    ...metadata,
                    ...info.json.script,
                    id: "debug-" + metadata.source,
                    icon: `data:image/*;base64,${fs.readFileSync(iconPath).toString('base64')}`,
                    enabled: true,
                    debug: true,
                    data: {}
                };

                const { sendModernRequest } = require('../utils');
                
                const srcDir = path.join(info.root, 'src');
                const readSourceMapSync = (dir, prefix = '') => {
                    const output = {};
                    const entries = fs.readdirSync(dir, { withFileTypes: true });
                    for (const entry of entries) {
                        const fp = path.join(dir, entry.name);
                        const relPath = prefix ? `${prefix}/${entry.name}` : entry.name;
                        if (entry.isDirectory()) {
                            Object.assign(output, readSourceMapSync(fp, relPath));
                        } else {
                            output[relPath] = fs.readFileSync(fp, 'utf8');
                        }
                    }
                    return output;
                };

                const srcObject = readSourceMapSync(srcDir);
                const payload = {
                    plugin: JSON.stringify(info.json),
                    icon: `data:image/*;base64,${fs.readFileSync(iconPath).toString('base64')}`,
                    src: JSON.stringify(srcObject)
                };

                const result = await sendModernRequest(ip, port, 'extension/install', payload, verbose);
                
                if (result.code === 200 || result.success || result.status === 200) {
                    console.log(c.success('Extension installed successfully!'));
                } else {
                    console.log(c.error(result.message || result.exception || 'Installation failed'));
                }
            } catch (error) {
                console.error(c.error(error.message));
            }
        });
}

module.exports = { register };
