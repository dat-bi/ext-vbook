function execute() {
    return Response.success([
        { title: "Mới cập nhật", input: "/", script: "gen.js" },
        { title: "Truyện dài", input: "/truyen-dai-tieu-thuyet/", script: "gen.js" },
        { title: "Truyện ngắn", input: "/truyen-ngan/", script: "gen.js" },
    ]);
}