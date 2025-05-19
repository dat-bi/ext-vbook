function execute() {
    return Response.success([
        { title: "Truyện mới cập nhật", input: "/danh-sach/truyen-moi", script: "gen.js" },
        { title: "Truyện hoàn thành", input: "/danh-sach/truyen-hoan-thanh", script: "gen.js" },
        { title: "Truyện tạm ngưng", input: "/danh-sach/truyen-tam-ngung", script: "gen.js" },
        { title: "Lượt đọc", input: "/xep-hang/luot-doc", script: "gen.js" },
        { title: "Đề cử", input: "/xep-hang/de-cu", script: "gen.js" },
    ]);
}
