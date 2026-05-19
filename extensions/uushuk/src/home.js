var BASE_URL = "https://www.uushuk.com";

function execute() {
    return Response.success([
        { title: "男生", input: "/list-1/", script: "gen.js" },
        { title: "女生", input: "/list-2/", script: "gen.js" },
        { title: "二次元", input: "/list-3/", script: "gen.js" },
        { title: "排行", input: "/rank.html", script: "gen.js" }
    ]);
}
