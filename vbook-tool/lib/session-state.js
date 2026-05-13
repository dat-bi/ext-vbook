/**
 * Session State Manager
 * Tracks workflow progress for MCP tools and persists it across server restarts.
 */

const fs = require('fs');
const path = require('path');

const STATE_FILE = path.join(__dirname, '..', '.vbook-session.json');

const SESSION_STEPS = [
    'init',
    'bootstrapped',
    'env_checked',
    'urls_provided',
    'inspected',
    'code_written',
    'validated',
    'debugged',
    'tested',
    'published'
];

var state = normalizeState({});

function normalizeState(input) {
    input = input || {};
    return {
        step: input.step || 'init',
        bootstrapped: !!input.bootstrapped,
        env_ok: !!input.env_ok,
        extension_name: input.extension_name || null,
        inspected_urls: input.inspected_urls || {},
        debugged_scripts: Array.isArray(input.debugged_scripts) ? input.debugged_scripts : [],
        required_scripts: Array.isArray(input.required_scripts) ? input.required_scripts : [],
        violations_log: Array.isArray(input.violations_log) ? input.violations_log : [],
        docs_loaded: Array.isArray(input.docs_loaded) ? input.docs_loaded : [],
        updated_at: input.updated_at || null
    };
}

function load() {
    if (!fs.existsSync(STATE_FILE)) return;
    try {
        state = normalizeState(JSON.parse(fs.readFileSync(STATE_FILE, 'utf8')));
    } catch (e) {
        state = normalizeState(state);
    }
}

function save() {
    try {
        state.updated_at = new Date().toISOString();
        fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), 'utf8');
    } catch (e) {}
}

load();

function stepIndex(step) {
    var idx = SESSION_STEPS.indexOf(step);
    return idx >= 0 ? idx : -1;
}

function advanceTo(step) {
    var currentIdx = stepIndex(state.step);
    var targetIdx = stepIndex(step);
    if (targetIdx < 0) return;
    if (targetIdx > currentIdx) {
        state.step = step;
        save();
    }
}

function canProceedTo(step) {
    var currentIdx = stepIndex(state.step);
    var targetIdx = stepIndex(step);
    if (targetIdx < 0) return false;
    return currentIdx >= targetIdx;
}

function getStatus() {
    return {
        step: state.step,
        step_index: stepIndex(state.step),
        total_steps: SESSION_STEPS.length,
        bootstrapped: state.bootstrapped,
        env_ok: state.env_ok,
        extension_name: state.extension_name,
        inspected_urls: Object.keys(state.inspected_urls),
        inspected_count: Object.keys(state.inspected_urls).length,
        debugged_scripts: state.debugged_scripts.slice(),
        required_scripts: state.required_scripts.slice(),
        all_debugged: allScriptsDebugged(),
        violations_count: state.violations_log.length,
        docs_loaded: state.docs_loaded.slice(),
        updated_at: state.updated_at,
        state_file: STATE_FILE,
        steps: SESSION_STEPS
    };
}

function addInspectedUrl(url, data) {
    state.inspected_urls[url] = {
        timestamp: new Date().toISOString(),
        selectors: data || {}
    };
    save();
}

function hasMinimumInspected() {
    return Object.keys(state.inspected_urls).length >= 2;
}

function markDebuggedScript(file) {
    if (state.debugged_scripts.indexOf(file) < 0) {
        state.debugged_scripts.push(file);
        save();
    }
}

function allScriptsDebugged() {
    if (state.required_scripts.length === 0) return true;
    for (var i = 0; i < state.required_scripts.length; i++) {
        if (state.debugged_scripts.indexOf(state.required_scripts[i]) < 0) {
            return false;
        }
    }
    return true;
}

function setRequiredScripts(list) {
    state.required_scripts = list.slice();
    save();
}

function reset(extensionName) {
    state = normalizeState({
        extension_name: extensionName || null
    });
    save();
}

function logViolation(v) {
    state.violations_log.push({
        timestamp: new Date().toISOString(),
        message: v
    });
    save();
}

function setEnvOk(ok) {
    state.env_ok = !!ok;
    save();
}

function setExtensionName(name) {
    state.extension_name = name || null;
    save();
}

function markBootstrapped(docsLoaded) {
    state.bootstrapped = true;
    state.docs_loaded = Array.isArray(docsLoaded) ? docsLoaded.slice() : [];
    advanceTo('bootstrapped');
    save();
}

module.exports = {
    advanceTo,
    canProceedTo,
    getStatus,
    addInspectedUrl,
    hasMinimumInspected,
    markDebuggedScript,
    allScriptsDebugged,
    setRequiredScripts,
    reset,
    logViolation,
    setEnvOk,
    setExtensionName,
    markBootstrapped,
    load,
    save,
    SESSION_STEPS
};
