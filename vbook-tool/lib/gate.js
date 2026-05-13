/**
 * Gate System
 * Blocks MCP tools when the session has not reached the required workflow step.
 */

var SESSION_STEPS = require('./session-state').SESSION_STEPS;

var GATE_MAP = {
    // Always allowed
    'bootstrap_session':    null,
    'get_session_state':    null,
    'reset_session':        null,
    'read_context':         null,
    'list_extensions':      null,
    'get_plugin_info':      null,

    // Must load docs/session first
    'check_env':            'bootstrapped',
    'node_preflight_probe': 'bootstrapped',
    'convert_preflight_to_vbook_fetch': 'bootstrapped',

    // Must confirm environment before touching live workflows
    'analyze':              'env_checked',
    'inspect':              'env_checked',
    'get_dom_tree':         'env_checked',
    'create':               'env_checked',
    'create_smart':         'env_checked',
    'create_extension_flow':'env_checked',
    'copy_demo':            'env_checked',
    'update_plugin_json':   'env_checked',
    'update_plugin_version':'env_checked',
    'list_extension_files': 'env_checked',
    'read_extension':       'env_checked',
    'append_lesson':        'env_checked',
    'write_extension_script': 'env_checked',

    // Quality gates
    'validate':             'code_written',
    'debug':                'validated',
    'test_all':             'debugged',
    'build':                'tested',
    'publish':              'tested',
    'publish_my_extensions':'tested',
    'install':              'tested'
};

var HINTS = {
    'bootstrapped': 'Call bootstrap_session first so the agent loads the required docs and persisted state.',
    'env_checked':  'Call check_env first. If it fails, stop and ask the user to update VBOOK_IP/VBOOK_PORT.',
    'urls_provided':'Collect listing/detail/toc/chapter URLs from the user.',
    'inspected':    'Inspect or discover real site data before writing selectors.',
    'code_written': 'Write or update script code before validate.',
    'validated':    'Run validate and fix all errors before debug.',
    'debugged':     'Debug relevant scripts on the VBook device before test_all.',
    'tested':       'Run test_all successfully before build/publish/install.'
};

function getHint(requiredStep) {
    return HINTS[requiredStep] || ('Required step: ' + requiredStep);
}

function checkGate(toolName, currentState) {
    var requiredStep = GATE_MAP[toolName];
    if (requiredStep === null || requiredStep === undefined) {
        return { blocked: false };
    }

    var currentIdx = SESSION_STEPS.indexOf(currentState.step);
    var requiredIdx = SESSION_STEPS.indexOf(requiredStep);

    if (requiredIdx < 0 || currentIdx >= requiredIdx) {
        return { blocked: false };
    }

    return {
        blocked: true,
        tool: toolName,
        reason: 'TOOL BLOCKED: "' + toolName + '" requires step "' + requiredStep + '" but session is at "' + currentState.step + '".',
        current_step: currentState.step,
        required_step: requiredStep,
        hint: getHint(requiredStep)
    };
}

module.exports = {
    checkGate,
    GATE_MAP,
    getHint
};
