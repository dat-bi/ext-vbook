function execute(url) {
    return Response.success(
        [
            { title: "Truyện Mới", input: "/danh-sach/truyen-moi", script: "gen.js" },
            { title: "Truyện Hot", input: "/danh-sach/truyen-hot", script: "gen.js" },
            { title: "Truyện FULL", input: "/danh-sach/truyen-full", script: "gen.js" }
        ]
    )
}