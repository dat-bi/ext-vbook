function execute() {
    return Response.success([

        // 热门作品排行
        {title: "起点月票榜", input: "/rank/yuepiao/year{year}-month{month}-page{page}/", script: "gen.js"},
        {title: "24小时热销榜", input: "/rank/hotsales/page{page}/", script: "gen.js"},
        {title: "阅读指数榜", input: "/rank/readindex/page{page}/", script: "gen.js"},
        {title: "推荐票榜", input: "/rank/recom/page{page}/", script: "gen.js"},
        {title: "收藏榜", input: "/rank/collect/page{page}/", script: "gen.js"},
        {title: "更新榜", input: "/rank/vipup/page{page}/", script: "gen.js"},

    ]);
}