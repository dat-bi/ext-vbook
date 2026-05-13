/**
 * Plugin list generator — scans all extensions and produces root plugin.json
 * Replaces the standalone update_plugin_list.js
 */
const fs = require('fs');
const path = require('path');
const { getProjectRoot, getExtensionsDir, getAuthor, getGithubRepo } = require('./plugin-info');

/**
 * Scan all extension directories and return their metadata.
 * Scans inside the extensions/ directory. Templates live in templates/ and are not scanned.
 * @param {object} [opts]
 * @param {string} [opts.filterType]    Filter by type (novel, comic, etc.)
 * @param {string} [opts.filterLocale]  Filter by locale (vi_VN, zh_CN, etc.)
 * @returns {Array<object>}  Array of extension metadata objects
 */
function scanExtensions(opts) {
    opts = opts || {};
    const extensionsDir = getExtensionsDir();
    const extensions = [];
    
    if (!fs.existsSync(extensionsDir)) {
        return extensions;
    }
    
    // Directories to skip
    const skipDirs = new Set([
        '.git', '.vscode', 'node_modules'
    ]);

    const entries = fs.readdirSync(extensionsDir, { withFileTypes: true });
    
    for (const entry of entries) {
        if (!entry.isDirectory()) continue;
        if (skipDirs.has(entry.name)) continue;
        if (entry.name.startsWith('_')) continue; // Skip any private/internal extension directory

        const pluginJsonPath = path.join(extensionsDir, entry.name, 'plugin.json');
        if (!fs.existsSync(pluginJsonPath)) continue;

        try {
            const raw = fs.readFileSync(pluginJsonPath, 'utf8');
            const pluginDetail = JSON.parse(raw);
            
            // Must have metadata to be a valid extension
            if (!pluginDetail.metadata || !pluginDetail.metadata.name) continue;

            const meta = pluginDetail.metadata;

            // Apply filters
            if (opts.filterType && meta.type !== opts.filterType) continue;
            if (opts.filterLocale && meta.locale !== opts.filterLocale) continue;

            extensions.push({
                dirName: entry.name,
                metadata: meta,
                hasZip: fs.existsSync(path.join(extensionsDir, entry.name, 'plugin.zip')),
                hasIcon: fs.existsSync(path.join(extensionsDir, entry.name, 'icon.png')),
                hasSrc: fs.existsSync(path.join(extensionsDir, entry.name, 'src'))
            });
        } catch (e) {
            // Skip directories with invalid plugin.json
        }
    }

    return extensions;
}

/**
 * Generate the root plugin.json content (the extension registry).
 * @param {Array<object>} [extensionsList]  Optional pre-scanned list
 * @returns {object}  The plugin.json data object
 */
function generatePluginList(extensionsList) {
    const extensions = extensionsList || scanExtensions();
    const repo = getGithubRepo();
    const author = getAuthor();

    const data = {
        metadata: {
            author: author,
            description: "📛🔻📛"
        },
        data: []
    };

    for (const ext of extensions) {
        const meta = ext.metadata;
        const encodedName = encodeURIComponent(ext.dirName);
        const baseUrl = `https://raw.githubusercontent.com/${repo}/main/extensions/${encodedName}`;

        const entry = {
            name: meta.name,
            author: meta.author || author,
            path: `${baseUrl}/plugin.zip`,
            version: meta.version,
            source: meta.source,
            icon: `${baseUrl}/icon.png`,
            description: meta.description,
            type: meta.type
        };

        if (meta.locale) entry.locale = meta.locale;
        if (meta.tag) entry.tag = meta.tag;

        data.data.push(entry);
    }

    return data;
}

/**
 * Write the root plugin.json file.
 * @param {object} [data]  Optional pre-generated data
 * @returns {{ path: string, count: number }}
 */
function writePluginList(data) {
    const pluginData = data || generatePluginList();
    const projectRoot = getProjectRoot();
    const outputPath = path.join(projectRoot, 'plugin.json');

    fs.writeFileSync(outputPath, JSON.stringify(pluginData, null, 4));

    return {
        path: outputPath,
        count: pluginData.data.length
    };
}

module.exports = { scanExtensions, generatePluginList, writePluginList };
