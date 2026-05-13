/**
 * Plugin info resolver — finds and parses plugin.json for extensions
 */
const path = require('path');
const fs = require('fs');

const EXTENSIONS_DIR = 'extensions';
const TEMPLATES_DIR = 'templates';

/**
 * Get the extensions directory path.
 * @returns {string}
 */
function getExtensionsDir() {
    return path.join(getProjectRoot(), EXTENSIONS_DIR);
}

/**
 * Get the templates directory path.
 * @returns {string}
 */
function getTemplatesDir() {
    return path.join(getProjectRoot(), TEMPLATES_DIR);
}

/**
 * Locate plugin root directory and parse plugin.json.
 * Supports both flat structure (root/) and extensions/ structure.
 * @param {string} [targetPath='.'] Starting directory
 * @returns {{ root: string, name: string, json: object }}
 */
function getPluginInfo(targetPath) {
    let currentDir = path.resolve(targetPath || '.');
    let pluginJsonPath = path.join(currentDir, 'plugin.json');

    // If plugin.json not found, check parent directories
    if (!fs.existsSync(pluginJsonPath)) {
        const folderName = path.basename(currentDir);
        
        // Inside vbook-tool or src → go up
        if (folderName === 'vbook-tool' || folderName === 'src') {
            currentDir = path.dirname(currentDir);
        }
        // Inside an extension → go up to extensions/
        else if (folderName === EXTENSIONS_DIR) {
            currentDir = path.dirname(currentDir);
        }
        
        pluginJsonPath = path.join(currentDir, 'plugin.json');
        
        // Final fallback: check if inside an extension subdirectory in extensions/
        if (!fs.existsSync(pluginJsonPath)) {
            const parentDir = path.dirname(currentDir);
            const parentName = path.basename(currentDir);
            const grandParentDir = path.dirname(parentDir);
            
            if (path.basename(parentDir) === EXTENSIONS_DIR && 
                path.basename(grandParentDir) !== EXTENSIONS_DIR) {
                // We're inside extensions/<name>/src or extensions/<name>/, find the extension root
                currentDir = parentDir;
                pluginJsonPath = path.join(currentDir, parentName, 'plugin.json');
                if (!fs.existsSync(pluginJsonPath)) {
                    currentDir = path.join(parentDir, parentName);
                    pluginJsonPath = path.join(currentDir, 'plugin.json');
                }
            }
        }
    }

    if (!fs.existsSync(pluginJsonPath)) {
        throw new Error(`plugin.json not found. Run from the extension root or use 'extensions/<name>/'.`);
    }

    const pluginJson = JSON.parse(fs.readFileSync(pluginJsonPath, 'utf8'));
    const extRoot = path.dirname(pluginJsonPath);
    const extName = path.basename(extRoot);
    
    return {
        root: extRoot,
        name: extName,
        json: pluginJson
    };
}

/**
 * Get the project root (parent of all extension directories).
 * @returns {string}
 */
function getProjectRoot() {
    const toolDir = path.join(__dirname, '..');
    return path.dirname(toolDir);
}

/**
 * Read author from .env
 * @returns {string}
 */
function getAuthor() {
    return process.env.author || 'B';
}

/**
 * Read GitHub repo from .env
 * @returns {string}
 */
function getGithubRepo() {
    return process.env.GITHUB_REPO || 'dat-bi/ext-vbook';
}

module.exports = { getPluginInfo, getProjectRoot, getExtensionsDir, getTemplatesDir, getAuthor, getGithubRepo };
