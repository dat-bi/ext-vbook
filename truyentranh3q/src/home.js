function execute() {
    return Response.success([
        { title: "Mới Cập Nhật", input: "/danh-sach/truyen-moi-cap-nhat", script: "gen.js" },
        { title: "Truyện Mới", input: "/danh-sach/truyen-tranh-moi", script: "gen.js" },
        { title: "Truyện Full", input: "/danh-sach/truyen-hoan-thanh", script: "gen.js" },
        { title: "Truyện Ngẫu Nhiên", input: "/danh-sach/truyen-ngau-nhien", script: "gen.js" }
    ]);
}