function execute() {
    return Response.success([
        {title: "Mới Cập Nhật", input: "/danh-sach/moi-cap-nhat", script: "gen.js"},
        {title: "Truyện Full", input: "/danh-sach/truyen-full", script: "gen.js"},
        {title: "Truyện VIP Free", input: "/danh-sach/free-vip", script: "gen.js"},
        {title: "Dâm Hiệp", input: "/danh-sach/category/dam-hiep", script: "gen.js"}
    ]);
}
