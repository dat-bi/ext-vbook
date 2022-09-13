function execute() {
    return Response.success([
        {title: "Áo dài", input: "/category/ao-dai/", script: "gen.js"},
        {title: "Bác sĩ - Y tá", input: "/category/bac-si-y-ta/", script: "gen.js"},
        {title: "Bắn tinh lên mặt", input: "/category/banh-mi-kep-xuc-xich/", script: "gen.js"},
        {title: "Còn nhiều vc, lên web mà tìm rồi gettruyen về đọc", input: "/", script: "gen.js"},
    ]);
}
