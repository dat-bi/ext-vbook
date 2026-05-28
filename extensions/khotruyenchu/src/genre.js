load('config.js');

function execute() {
    return Response.success([
        { title: "Top Qidian", input: BASE_URL + "/top-qidian/", script: "gen.js" },
        { title: "Độc giả yêu cầu dịch", input: BASE_URL + "/yeu-cau-dich/", script: "gen.js" },
        { title: "Huyền huyễn - Tiên hiệp", input: BASE_URL + "/the-loai/huyen-huyen-tien-hiep/", script: "gen.js" }
    ]);
}
