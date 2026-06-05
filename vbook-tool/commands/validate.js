/**
 * VALIDATE COMMAND — Check extension validity and Rhino compatibility
 * Critical for AI: catches unsupported syntax before deploying to device
 */
const path = require('path');
const fs = require('fs');
const { getPluginInfo } = require('../lib/plugin-info');
const c = require('../lib/colors');

// Rhino-incompatible patterns with line-level detection
const RHINO_CHECKS = [
    {
        name: 'async/await',
        pattern: /\b(async\s+function|await\s+)/,
        severity: 'error',
        fix: 'Use synchronous calls only (fetch, Http.get, etc.)'
    },
    {
        name: 'optional chaining (?.)',
        pattern: /\w+\?\.\w+/,
        severity: 'error',
        fix: 'Use: obj && obj.prop'
    },
    {
        name: 'nullish coalescing (??)',
        pattern: /\?\?/,
        severity: 'error',
        fix: 'Use: a != null ? a : b'
    },
    {
        name: 'spread in call (...args)',
        pattern: /\w+\(\s*\.\.\./,
        severity: 'error',
        fix: 'Use: func.apply(null, args)'
    },
    {
        name: 'spread in array [...x]',
        pattern: /\[\s*\.\.\./,
        severity: 'error',
        fix: 'Use: arr.slice() or [].concat(arr)'
    },
    {
        name: 'default parameter',
        pattern: /function\s+\w+\s*\([^)]*=\s*/,
        severity: 'error',
        fix: 'Use: a = a !== undefined ? a : defaultVal'
    },
    {
        name: 'arrow default parameter',
        pattern: /\(\s*\w+\s*=[^=][^)]*\)\s*=>/,
        severity: 'error',
        fix: 'Use: a = a !== undefined ? a : defaultVal'
    },
    {
        name: 'import/export statement',
        pattern: /^(import\s+|export\s+(default\s+)?)/m,
        severity: 'error',
        fix: 'Use: load("file.js")'
    },
    {
        name: 'String.matchAll',
        pattern: /\.matchAll\s*\(/,
        severity: 'error',
        fix: 'Use exec() in a while loop'
    },
    {
        name: 'Promise.allSettled/any',
        pattern: /Promise\.(allSettled|any)\s*\(/,
        severity: 'error',
        fix: 'Not supported in Rhino'
    }
];

const VALID_TYPES = ['novel', 'comic', 'chinese_novel', 'translate', 'tts', 'video'];
const VALID_LOCALES = ['vi_VN', 'zh_CN', 'zh-CN', 'en_US'];
const REQUIRED_SCRIPTS = ['detail.js', 'toc.js', 'chap.js'];
const REQUIRED_BY_TYPE = {
    translate: ['language.js', 'translate.js'],
    tts: ['voice.js', 'tts.js']
};

/**
 * Run validation on an extension directory.
 * @param {string} [targetPath]  Extension root directory
 * @returns {{ errors: number, warnings: number, messages: string[] }}
 */
function runValidation(targetPath) {
    const result = { errors: 0, warnings: 0, messages: [] };

    const addError = (msg) => { result.errors++; result.messages.push(c.red(`  ❌ ${msg}`)); };
    const addWarn  = (msg) => { result.warnings++; result.messages.push(c.yellow(`  ⚠️  ${msg}`)); };
    const addOk    = (msg) => { result.messages.push(c.green(`  ✅ ${msg}`)); };

    let root;
    try {
        const info = getPluginInfo(targetPath);
        root = info.root;
    } catch (e) {
        addError(e.message);
        return result;
    }

    const pluginJsonPath = path.join(root, 'plugin.json');
    let pluginJson;

    // 1. Check plugin.json
    try {
        pluginJson = JSON.parse(fs.readFileSync(pluginJsonPath, 'utf8'));
        addOk('plugin.json is valid JSON');
    } catch (e) {
        addError(`plugin.json parse error: ${e.message}`);
        return result;
    }

    const meta = pluginJson.metadata || {};
    const scripts = pluginJson.script || {};
    const config = pluginJson.config || {};

    // 2. Metadata checks
    if (!meta.name) addError('metadata.name is missing');
    else addOk(`name: "${meta.name}"`);

    if (!meta.source) addError('metadata.source is missing');

    if (typeof meta.version !== 'number') addError(`metadata.version must be a number, got: ${typeof meta.version}`);
    
    if (meta.type && !VALID_TYPES.includes(meta.type)) {
        addError(`metadata.type "${meta.type}" is invalid. Valid: ${VALID_TYPES.join(', ')}`);
    }

    if (meta.locale && !VALID_LOCALES.includes(meta.locale)) {
        addWarn(`metadata.locale "${meta.locale}" is unusual. Expected: ${VALID_LOCALES.join(', ')}`);
    }

    // 3. Regexp check
    if (meta.regexp) {
        try {
            new RegExp(meta.regexp);
            addOk(`regexp is valid: ${meta.regexp}`);
        } catch (e) {
            addError(`metadata.regexp is invalid: ${e.message}`);
        }
    }

    // 4. Icon check
    const iconPath = path.join(root, 'icon.png');
    if (fs.existsSync(iconPath)) {
        const iconSize = fs.statSync(iconPath).size;
        if (iconSize < 100) addWarn(`icon.png is very small (${iconSize} bytes)`);
        else addOk(`icon.png found (${(iconSize / 1024).toFixed(1)} KB)`);
    } else {
        addError('icon.png not found (required)');
    }

    // 5. Script files check
    const srcDir = path.join(root, 'src');
    if (!fs.existsSync(srcDir)) {
        addError('src/ directory not found');
        return result;
    }

    let scriptCount = 0;
    for (const [key, fileName] of Object.entries(scripts)) {
        const filePath = path.join(srcDir, fileName);
        if (!fs.existsSync(filePath)) {
            addError(`Script "${key}": ${fileName} not found in src/`);
        } else {
            scriptCount++;
        }
    }
    if (scriptCount > 0) addOk(`${scriptCount} script file(s) found`);

    // 6. Check config schema
    const configKeys = Object.keys(config);
    if (configKeys.length > 0) {
        addOk(`${configKeys.length} config field(s) found`);
        for (const key of configKeys) {
            const item = config[key];
            if (item === null || ['string', 'number', 'boolean'].includes(typeof item)) {
                continue;
            }
            if (!item || typeof item !== 'object' || Array.isArray(item)) {
                addWarn(`config.${key}: should be a primitive value or an object with title/mode/format/default`);
                continue;
            }
            if (!item.title) addWarn(`config.${key}: missing title`);
            if (!item.mode) addWarn(`config.${key}: missing mode (usually "input")`);
            if (!item.format) addWarn(`config.${key}: missing format ("text" or "number")`);
            if (item.format && ['text', 'number'].indexOf(String(item.format)) < 0) {
                addWarn(`config.${key}: unusual format "${item.format}"`);
            }
            if (Object.prototype.hasOwnProperty.call(item, 'default')) {
                if (item.format === 'number' && typeof item.default !== 'number') {
                    addWarn(`config.${key}: default should be a number for format "number"`);
                }
                if (item.format === 'text' && typeof item.default !== 'string') {
                    addWarn(`config.${key}: default should be a string for format "text"`);
                }
            }
        }
    }

    const configJsPath = path.join(srcDir, 'config.js');
    const interactiveConfigKeys = configKeys.filter(function(key) {
        const item = config[key];
        return item && typeof item === 'object' && !Array.isArray(item);
    });
    if (interactiveConfigKeys.length > 0 && fs.existsSync(configJsPath)) {
        const configContent = fs.readFileSync(configJsPath, 'utf8');
        if (configContent.indexOf('replace(/"/g') < 0 && configContent.indexOf('configText(') < 0) {
            addWarn('config.js should sanitize config globals before use, for example String(raw).replace(/"/g, "").trim()');
        }
    }

    // 7. Check required scripts by type
    if (['novel', 'comic', 'chinese_novel'].includes(meta.type)) {
        for (const req of REQUIRED_SCRIPTS) {
            const baseName = req.replace('.js', '');
            if (!scripts[baseName]) {
                addWarn(`Missing recommended script: ${baseName} (required for type "${meta.type}")`);
            }
        }
    } else if (REQUIRED_BY_TYPE[meta.type]) {
        for (const req of REQUIRED_BY_TYPE[meta.type]) {
            const baseName = req.replace('.js', '');
            if (!scripts[baseName]) {
                addWarn(`Missing recommended script: ${baseName} (required for type "${meta.type}")`);
            }
        }
    }

    // 8. Check each JS file for execute() and Rhino constraints
    for (const [key, fileName] of Object.entries(scripts)) {
        const filePath = path.join(srcDir, fileName);
        if (!fs.existsSync(filePath)) continue;

        const content = fs.readFileSync(filePath, 'utf8');
        const lines = content.split('\n');

        // Check for execute() function
        if (!/function\s+execute\s*\(/.test(content)) {
            addError(`${fileName}: missing "function execute()" — ALL scripts MUST export execute()`);
        }

        // Check Rhino constraints line by line
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            // Skip comments
            const trimmed = line.trim();
            if (trimmed.startsWith('//') || trimmed.startsWith('*') || trimmed.startsWith('/*')) continue;

            for (const check of RHINO_CHECKS) {
                if (check.pattern.test(line)) {
                    const lineNum = i + 1;
                    const msg = `${fileName}:${lineNum} — ${check.name}`;
                    if (check.severity === 'error') {
                        addError(`${msg}\n       Fix: ${check.fix}`);
                    } else {
                        addWarn(msg);
                    }
                }
            }
        }
    }

    // 9. Check script paths don't include src/ prefix
    for (const [key, fileName] of Object.entries(scripts)) {
        if (fileName.startsWith('src/')) {
            addError(`script.${key}: value "${fileName}" should NOT include "src/" prefix. Use just "${fileName.replace('src/', '')}"`);
        }
    }

    return result;
}

function register(program) {
    program.command('validate')
        .description('Validate extension structure and Rhino compatibility')
        .argument('[path]', 'Extension directory path', '.')
        .action((targetPath) => {
            let extName;
            try {
                const info = getPluginInfo(targetPath);
                extName = info.json.metadata.name || info.name;
            } catch (e) {
                extName = path.basename(path.resolve(targetPath));
            }

            console.log(c.bold(`\n🔍 Validating: ${c.cyan(extName)}\n`));

            const result = runValidation(targetPath);

            // Print all messages
            result.messages.forEach(msg => console.log(msg));

            // Summary
            console.log('');
            if (result.errors === 0 && result.warnings === 0) {
                console.log(c.bold(c.green('✅ All checks passed!')));
            } else {
                const parts = [];
                if (result.errors > 0)   parts.push(c.red(`${result.errors} error(s)`));
                if (result.warnings > 0) parts.push(c.yellow(`${result.warnings} warning(s)`));
                console.log(c.bold(`Result: ${parts.join(', ')}`));
            }
            console.log('');
        });
}

module.exports = { register, runValidation };
