/**
 * CHECK-ENV COMMAND — Verify environment setup and device connectivity
 */
const { getPluginInfo, getProjectRoot, getExtensionsDir } = require('../lib/plugin-info');
const { getCandidateIps, checkDeviceConnect } = require('../utils');
const { scanExtensions } = require('../lib/plugin-list');
const c = require('../lib/colors');
const fs = require('fs');
const path = require('path');

function register(program) {
    program.command('check-env')
        .description('Check environment config and device connectivity')
        .option('--json', 'Output as JSON')
        .action(async (options) => {
            const json = options.json || false;
            const report = { ok: true, issues: [], env: {}, device: {}, workspace: {} };

            const pass  = (msg)  => { if (!json) console.log(c.green(`  ✅ ${msg}`)); };
            const fail  = (msg)  => { report.ok = false; report.issues.push(msg); if (!json) console.log(c.red(`  ❌ ${msg}`)); };
            const warn  = (msg)  => { report.issues.push(`[WARN] ${msg}`); if (!json) console.log(c.yellow(`  ⚠️  ${msg}`)); };
            const step  = (msg)  => { if (!json) console.log(c.dim(`\n  ${msg}`)); };

            if (!json) console.log(c.bold('\n🔍 VBook Environment Check\n'));

            // ─── ENV variables ─────────────────────────────────────────────────
            step('Environment variables:');

            const ip = process.env.VBOOK_IP;
            const ips = getCandidateIps();
            const port = parseInt(process.env.VBOOK_PORT || '8080');
            const author = process.env.author;

            report.env = { VBOOK_IP: ip || null, VBOOK_IPS: ips, VBOOK_PORT: port, author: author || null };

            if (ips.length === 0) {
                fail('VBOOK_IP or VBOOK_IPS is not set in vbook-tool/.env');
            } else {
                pass(`VBook IP candidates = ${ips.join(', ')}`);
            }
            pass(`VBOOK_PORT = ${port}`);
            if (!author) {
                warn('author not set in .env — extensions will use default author');
            } else {
                pass(`author = ${author}`);
            }

            // ─── Workspace scan ────────────────────────────────────────────────
            step('Workspace:');
            try {
                const extDir = getExtensionsDir();
                const exts = scanExtensions();
                report.workspace = {
                    extensionsDir: extDir,
                    count: exts.length,
                    extensions: exts.map(e => ({ name: e.metadata.name, version: e.metadata.version, hasZip: e.hasZip }))
                };
                pass(`Extensions directory: ${extDir}`);
                pass(`${exts.length} extension(s) found`);
            } catch (e) {
                warn(`Could not scan extensions: ${e.message}`);
            }

            // ─── Device connectivity ───────────────────────────────────────────
            step('Device connectivity:');
            if (ips.length > 0) {
                const checked = [];
                let selected = null;
                for (const candidate of ips) {
                    const result = await checkDeviceConnect(candidate, port, 2000);
                    checked.push(result);
                    if (result.ok && !selected) selected = result;
                    if (!json) {
                        if (result.ok) pass(`Device reachable at http://${candidate}:${port} (${result.latency}ms)`);
                        else warn(`Cannot reach http://${candidate}:${port} — ${result.error || result.status}`);
                    }
                }

                report.device = {
                    ip: selected ? selected.ip : null,
                    port,
                    status: selected ? selected.status : 'unreachable',
                    latency: selected ? `${selected.latency}ms` : null,
                    response: selected ? selected.response : null,
                    candidates: checked
                };

                if (selected) {
                    process.env.VBOOK_IP = selected.ip;
                    if (!json) console.log(c.green(`\n  ✅ Selected VBOOK_IP = ${selected.ip}`));
                } else {
                    fail(`Cannot reach any VBook device on port ${port}`);
                    fail(`Update VBOOK_IPS or VBOOK_IP in vbook-tool/.env`);
                }
            } else {
                warn('Skipping device ping — VBOOK_IP/VBOOK_IPS not set');
            }

            // ─── Output ────────────────────────────────────────────────────────
            if (json) {
                console.log(JSON.stringify(report, null, 2));
            } else {
                console.log('');
                if (report.ok && report.issues.filter(i => !i.startsWith('[WARN]')).length === 0) {
                    console.log(c.bold(c.green('✅ Environment is ready!')));
                } else {
                    const errors = report.issues.filter(i => !i.startsWith('[WARN]'));
                    const warnings = report.issues.filter(i => i.startsWith('[WARN]'));
                    if (errors.length) console.log(c.bold(c.red(`❌ ${errors.length} issue(s) need fixing`)));
                    if (warnings.length) console.log(c.bold(c.yellow(`⚠️  ${warnings.length} warning(s)`)));
                }
                console.log('');
            }

            if (!report.ok) process.exit(1);
        });
}

module.exports = { register };
