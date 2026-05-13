// home.js (Comic)
// có link thì mới thêm vào
// Contract: execute() → [{ title, input, script }]
function execute() {
    // TODO: Thay PATH phù hợp với cấu trúc URL của site
    return Response.success([
        { title: "Mới cập nhật", input: BASE_URL + "/PATH_MOI/{{page}}",  script: "gen.js" },
        { title: "Top view",     input: BASE_URL + "/PATH_TOP/{{page}}",  script: "gen.js" },
        { title: "Hoàn thành",   input: BASE_URL + "/PATH_HOAN/{{page}}", script: "gen.js" },
    ]);
}
