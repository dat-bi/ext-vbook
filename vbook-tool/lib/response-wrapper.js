/**
 * Response Wrapper
 * Injects `_next` hint and `_step` into every tool response.
 * AI reads `_next` to know exactly what to do after each tool call.
 */

/**
 * Get the next-step hint based on which tool just ran and its result.
 */
function getNextHint(toolName, result) {
    switch (toolName) {
        case 'bootstrap_session':
            return 'Bootstrap complete. Next: call check_env before any device-dependent workflow.';

        case 'check_env':
            return result.ok
                ? '✅ Env OK. Tiếp theo: inspect các URLs (listing, detail, toc, chap).'
                : '❌ DỪNG. Cập nhật VBOOK_IP trong vbook-tool/.env rồi báo user.';

        case 'inspect':
        case 'get_dom_tree':
            return (result.success !== false)
                ? '✅ Inspect xong. Dùng selectors thực từ kết quả này. Gọi write_extension_script — KHÔNG dùng placeholder.'
                : '❌ Inspect thất bại. Kiểm tra URL và kết nối device.';

        case 'analyze':
            return result.error
                ? '❌ Analyze thất bại. Kiểm tra URL.'
                : '✅ Analyze xong. Dùng kết quả để viết code.';
        case 'node_preflight_probe':
            return result.success
                ? '✅ Node preflight OK. Tiếp theo: convert_preflight_to_vbook_fetch rồi test lại bằng debug trên device.'
                : '❌ Node preflight fail. Kiểm tra URL/headers/cookies trước.';
        case 'convert_preflight_to_vbook_fetch':
            return '✅ Đã convert sang script fetch cho VBook. Tiếp theo: write_extension_script → validate → debug.';

        case 'create_extension_flow':
            if (result.status === 'success')
                return '✅ Extension scaffolded. Tiếp theo: inspect URLs để lấy real selectors.';
            if (result.status === 'need_answers')
                return '⏳ Cần user trả lời các câu hỏi trước khi tiếp tục.';
            return '❌ Tạo extension thất bại. Đọc message.';

        case 'write_extension_script':
            return '✅ Script đã ghi. Tiếp theo: gọi validate.';

        case 'validate':
            if (result.errors === 0)
                return '✅ Validate pass. Tiếp theo: debug từng script (detail, toc, chap).';
            return '❌ DỪNG. Fix ' + result.errors + ' error(s) trước. Đọc output để biết lỗi cụ thể.';

        case 'debug':
            return result.success
                ? '✅ Script pass. Tiếp theo: debug script tiếp theo, hoặc gọi test_all nếu tất cả đã xong.'
                : '❌ DỪNG. Fix exception trước. Đọc log từ device.';

        case 'test_all':
            return result.success
                ? '✅ Test-all pass. Tiếp theo: gọi publish.'
                : '❌ DỪNG. Fix bước thất bại trước khi publish.';

        case 'publish':
        case 'publish_my_extensions':
            return result.success
                ? '🎉 HOÀN THÀNH. Extension đã publish thành công.'
                : '❌ Publish thất bại. Kiểm tra lỗi.';

        case 'build':
            return result.success
                ? '✅ Build xong.'
                : '❌ Build thất bại. Kiểm tra lỗi.';

        case 'install':
            return result.success
                ? '✅ Install xong. Extension đã push lên device.'
                : '❌ Install thất bại.';

        default:
            return null;
    }
}

/**
 * Wrap a tool result with _next hint and _step info.
 * @param {string} toolName - Name of the tool that was called
 * @param {object} result - The tool's result object
 * @param {object} sessionStatus - Current session status from getStatus()
 * @returns {object} The result with _next and _step injected
 */
function wrap(toolName, result, sessionStatus) {
    var hint = getNextHint(toolName, result);
    if (hint) result._next = hint;
    if (sessionStatus) result._step = sessionStatus.step;
    return result;
}

module.exports = {
    wrap,
    getNextHint
};
