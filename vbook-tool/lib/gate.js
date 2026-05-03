/**
 * Gate System
 * Maps each tool to a required session step.
 * Blocks tool calls if the session hasn't reached the prerequisite step.
 */

var SESSION_STEPS = require('./session-state').SESSION_STEPS;

// Tool → minimum required step (null = always allowed)
var GATE_MAP = {
    // No gate — always allowed
    'check_env':            null,
    'get_session_state':    null,
    'reset_session':        null,
    'read_context':         null,
    'list_extensions':      null,
    'get_plugin_info':      null,
    'node_preflight_probe': null,
    'convert_preflight_to_vbook_fetch': null,

    // Need env_checked
    'analyze':              'env_checked',
    'inspect':              'env_checked',
    'get_dom_tree':         'env_checked',
    'create':               'env_checked',
    'create_smart':         'env_checked',
    'create_extension_flow':null,
    'copy_demo':            'env_checked',
    'update_plugin_json':   'env_checked',
    'update_plugin_version':'env_checked',
    'list_extension_files': 'env_checked',
    'read_extension':       'env_checked',
    'append_lesson':        'env_checked',

    // Need env_checked (so repair workflow is not blocked)
    'write_extension_script': 'env_checked',

    // Need code_written
    'validate':             'code_written',

    // Need validated
    'debug':                'validated',

    // Need debugged
    'test_all':             'debugged',

    // Need tested
    'build':                'tested',
    'publish':              'tested',
    'publish_my_extensions':'tested',
    'install':              'tested'
};

var HINTS = {
    'env_checked':  'Gọi check_env trước. Nếu fail → báo user cập nhật VBOOK_IP trong vbook-tool/.env.',
    'urls_provided':'Cần user cung cấp: URL listing, URL detail, URL toc, URL chap.',
    'inspected':    'Gọi inspect() cho ít nhất URL detail và URL chap. Dùng kết quả thực — không đoán selector.',
    'code_written': 'Viết code với real selectors từ inspect. Gọi write_extension_script.',
    'validated':    'Gọi validate. Phải đạt 0 errors trước khi debug.',
    'debugged':     'Gọi debug cho từng script (detail.js, toc.js, chap.js). Tất cả phải pass.',
    'tested':       'Gọi test_all. Phải success trước khi publish.'
};

/**
 * Get a human-readable hint for the required step.
 */
function getHint(requiredStep) {
    return HINTS[requiredStep] || ('Cần đạt bước: ' + requiredStep);
}

/**
 * Check if a tool is allowed given the current session state.
 * @param {string} toolName - Name of the MCP tool
 * @param {{step: string}} currentState - Current session state (from getStatus())
 * @returns {{blocked: boolean, tool?: string, reason?: string, current_step?: string, required_step?: string, hint?: string}}
 */
function checkGate(toolName, currentState) {
    var requiredStep = GATE_MAP[toolName];

    // No gate for this tool
    if (requiredStep === null || requiredStep === undefined) {
        return { blocked: false };
    }

    var currentIdx = SESSION_STEPS.indexOf(currentState.step);
    var requiredIdx = SESSION_STEPS.indexOf(requiredStep);

    if (requiredIdx < 0) {
        // Unknown required step — let it through
        return { blocked: false };
    }

    if (currentIdx >= requiredIdx) {
        // Current step is at or past the required step
        return { blocked: false };
    }

    // Blocked!
    return {
        blocked: true,
        tool: toolName,
        reason: '🚫 TOOL BLOCKED: "' + toolName + '" yêu cầu bước "' + requiredStep + '" nhưng session đang ở "' + currentState.step + '".',
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
