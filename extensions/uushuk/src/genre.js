var BASE_URL = "https://www.uushuk.com";

function execute() {
    return Response.success([
        { title: "全部", input: "/list-0/", script: "gen.js" },
        { title: "男生", input: "/list-1/", script: "gen.js" },
        { title: "女生", input: "/list-2/", script: "gen.js" },
        { title: "二次元", input: "/list-3/", script: "gen.js" },
        { title: "玄幻小说", input: "/list-4/", script: "gen.js" },
        { title: "奇幻小说", input: "/list-5/", script: "gen.js" },
        { title: "武侠小说", input: "/list-6/", script: "gen.js" },
        { title: "仙侠小说", input: "/list-7/", script: "gen.js" },
        { title: "都市小说", input: "/list-8/", script: "gen.js" },
        { title: "军事小说", input: "/list-9/", script: "gen.js" },
        { title: "历史小说", input: "/list-10/", script: "gen.js" },
        { title: "游戏小说", input: "/list-11/", script: "gen.js" },
        { title: "体育小说", input: "/list-12/", script: "gen.js" },
        { title: "科幻小说", input: "/list-13/", script: "gen.js" },
        { title: "诸天无限", input: "/list-14/", script: "gen.js" },
        { title: "悬疑小说", input: "/list-15/", script: "gen.js" },
        { title: "衍生同人", input: "/list-27/", script: "gen.js" }
    ]);
}
