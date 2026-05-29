load('config.js');

function execute() {
    return Response.success([
        { title: "Truyện Mới Cập Nhật", input: BASE_URL, script: "gen.js" },
        { title: "Top Qidian", input: BASE_URL + "/top-qidian/", script: "gen.js" },
        { title: "Độc giả yêu cầu dịch", input: BASE_URL + "/yeu-cau-dich/", script: "gen.js" }
    ]);
}
