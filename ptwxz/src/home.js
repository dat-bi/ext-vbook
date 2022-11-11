function execute() {
    return Response.success([
        {title: "玄幻魔法", input: "/booksort1/0/{0}.html", script: "gen.js"},
        {title: "武侠修真", input: "/booksort2/0/{0}.html", script: "gen.js"},
        {title: "都市言情", input: "/booksort3/0/{0}.html", script: "gen.js"},
        {title: "历史军事", input: "/booksort4/0/{0}.html", script: "gen.js"},
        {title: "网游竞技", input: "/booksort5/0/{0}.html", script: "gen.js"},
        {title: "科幻小说", input: "/booksort6/0/{0}.html", script: "gen.js"},
        {title: "恐怖灵异", input: "/booksort7/0/{0}.html", script: "gen.js"},
        {title: "同人漫画", input: "/booksort8/0/{0}.html", script: "gen.js"},
        {title: "其他类型", input: "/booksort9/0/{0}.html", script: "gen.js"},
    ]);
}