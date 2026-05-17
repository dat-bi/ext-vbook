const fs = require('fs');
const path = require('path');
const os = require('os');
const net = require('net');
const http = require('http');

/**
 * Get local IP address (IPv4)
 */
function getLocalIP() {
    const interfaces = os.networkInterfaces();
    const preferredInterfaces = ["Wi-Fi", "Ethernet", "en0", "wlan0"];
    
    for (const name of preferredInterfaces) {
        const ifaces = interfaces[name];
        if (ifaces) {
            for (const iface of ifaces) {
                if (iface.family === "IPv4" && !iface.internal) {
                    return iface.address;
                }
            }
        }
    }
    
    for (const name of Object.keys(interfaces)) {
        const ifaces = interfaces[name];
        if (ifaces) {
            for (const iface of ifaces) {
                if (iface.family === "IPv4" && !iface.internal) {
                    return iface.address;
                }
            }
        }
    }
    return "127.0.0.1";
}

/**
 * Send TCP request to the VBook app
 */
async function sendRequest(ip, port, headers, verbose = false) {
    return new Promise((resolve, reject) => {
        const client = new net.Socket();
        let responseData = "";

        client.connect(port, ip, () => {
            if (verbose) console.log(`[TCP] Connected to ${ip}:${port}`);
            client.write(headers);
        });

        client.on("data", (data) => {
            responseData += data.toString();
        });

        client.on("end", () => {
            try {
                const bodyStartIndex = responseData.indexOf("{");
                if (bodyStartIndex < 0) {
                    return resolve(responseData); // Return raw if not JSON
                }
                const body = responseData.substring(bodyStartIndex);
                resolve(JSON.parse(body));
            } catch (error) {
                resolve(responseData);
            }
        });

        client.on("error", (error) => {
            reject(error);
        });

        client.setTimeout(15000, () => {
            client.destroy();
            reject(new Error("Connection timeout"));
        });
    });
}

/**
 * Send HTTP POST request to the VBook app (Modern API)
 */
async function sendModernRequest(ip, port, endpoint, payload, verbose = false) {
    return new Promise((resolve, reject) => {
        const http = require('http');
        const data = JSON.stringify(payload);
        const options = {
            hostname: ip,
            port: port,
            path: `/${endpoint}`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(data)
            },
            timeout: 15000
        };

        const req = http.request(options, (res) => {
            let responseData = '';
            res.on('data', (chunk) => { responseData += chunk; });
            res.on('end', () => {
                try {
                    resolve(JSON.parse(responseData));
                } catch (e) {
                    resolve({ raw: responseData, code: res.statusCode });
                }
            });
        });

        req.on('error', (e) => reject(e));
        req.on('timeout', () => {
            req.destroy();
            reject(new Error("Connection timeout"));
        });

        if (verbose) console.log(`[HTTP POST] http://${ip}:${port}/${endpoint}`);
        req.write(data);
        req.end();
    });
}

function getCandidateIps() {
    const values = [];
    if (process.env.VBOOK_IPS) values.push(process.env.VBOOK_IPS);
    if (process.env.VBOOK_IP) values.push(process.env.VBOOK_IP);

    const seen = {};
    const ips = [];
    values.join(',')
        .split(/[\s,;]+/)
        .map(s => s.trim())
        .filter(Boolean)
        .forEach(ip => {
            if (seen[ip]) return;
            seen[ip] = true;
            ips.push(ip);
        });
    return ips;
}

function checkDeviceConnect(ip, port, timeoutMs = 1500) {
    return new Promise((resolve) => {
        const started = Date.now();
        const req = http.get({ hostname: ip, port, path: '/connect', timeout: timeoutMs }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                resolve({
                    ok: res.statusCode === 200,
                    ip,
                    port,
                    status: res.statusCode,
                    latency: Date.now() - started,
                    response: data.substring(0, 200)
                });
            });
        });
        req.on('error', (error) => resolve({ ok: false, ip, port, error: error.message }));
        req.on('timeout', () => {
            req.destroy();
            resolve({ ok: false, ip, port, error: 'timeout' });
        });
    });
}

async function resolveVBookEndpoint(options = {}) {
    const port = parseInt(options.port || process.env.VBOOK_PORT || '8080');
    if (options.ip) {
        return { ip: options.ip, port, candidates: [{ ip: options.ip, port, ok: true, explicit: true }] };
    }

    const ips = getCandidateIps();
    if (ips.length === 0) {
        throw new Error('VBOOK_IP/VBOOK_IPS not set in vbook-tool/.env');
    }

    const results = [];
    for (let i = 0; i < ips.length; i++) {
        const result = await checkDeviceConnect(ips[i], port, options.timeoutMs || 1500);
        results.push(result);
        if (result.ok) {
            process.env.VBOOK_IP = result.ip;
            return { ip: result.ip, port, candidates: results };
        }
    }

    throw new Error('Cannot reach any VBook device: ' + results.map(r => {
        return `${r.ip}:${port} (${r.error || r.status || 'unknown'})`;
    }).join(', '));
}

module.exports = {
    getLocalIP,
    sendRequest,
    sendModernRequest,
    getCandidateIps,
    checkDeviceConnect,
    resolveVBookEndpoint
};
