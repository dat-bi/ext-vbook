function execute() {
    return Response.success([
    {title : "Truyện Mới", input : "/kho-sach?sort_by=newest_at&page=", script: "gen.js" },
    {title : "Truyện full", input : "/kho-sach?status=2&page=", script: "gen.js" },
    ])
}