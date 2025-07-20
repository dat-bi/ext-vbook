function execute() {
    return Response.success([
        {title: "Truyện mới cập nhật", input: "/danh-sach/truyen-moi/", script: "gen.js"},
        {title: "Truyện Hot", input: "/danh-sach/truyen-hot/", script: "gen.js"},
        {title: "Truyện Full", input: "/danh-sach/truyen-full/", script: "gen.js"},
        {title: "Tiên Hiệp Hay", input: "/danh-sach/tien-hiep-hay/", script: "gen.js"},
        {title: "Kiếm Hiệp Hay", input: "/danh-sach/kiem-hiep-hay/", script: "gen.js"},
        {title: "Truyện Teen Hay", input: "/danh-sach/truyen-teen-hay/", script: "gen.js"},
        {title: "Ngôn Tình Hay", input: "/danh-sach/ngon-tinh-hay/", script: "gen.js"},
        {title: "Ngôn Tình Sắc", input: "/danh-sach/ngon-tinh-sac/", script: "gen.js"},
        {title: "Ngôn Tình Ngược", input: "/danh-sach/ngon-tinh-nguoc/", script: "gen.js"},
        {title: "Ngôn Tình Sủng", input: "/danh-sach/ngon-tinh-sung/", script: "gen.js"},
        {title: "Ngôn Tình Hài", input: "/danh-sach/ngon-tinh-hai/", script: "gen.js"},
        {title: "Đam Mỹ Hài", input: "/danh-sach/dam-my-hai/", script: "gen.js"},
        {title: "Đam Mỹ Hay", input: "/danh-sach/dam-my-hay/", script: "gen.js"},
        {title: "Đam Mỹ H Văn", input: "/danh-sach/dam-my-h-van/", script: "gen.js"},
        {title: "Đam Mỹ Sắc", input: "/danh-sach/dam-my-sac/", script: "gen.js"}
    ]);
}
