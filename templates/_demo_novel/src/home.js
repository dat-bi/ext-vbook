// home.js — Danh sách tab trang chủ
// có link thì mới thêm vào
// Contract: execute() → [{ title, input, script }]
// Mỗi item = 1 tab. "input" là URL truyền vào gen.js, {{page}} sẽ được thay tự động
function execute() {
    // TODO: Thay URL path phù hợp với site thực tế
    return Response.success([
        { title: "Mới cập nhật", input: BASE_URL + "/DUONG_DAN_MOI/{{page}}",    script: "gen.js" },
        { title: "Hot",          input: BASE_URL + "/DUONG_DAN_HOT/{{page}}",    script: "gen.js" },
        { title: "Hoàn thành",   input: BASE_URL + "/DUONG_DAN_HOAN/{{page}}",  script: "gen.js" },
    ]);
}
