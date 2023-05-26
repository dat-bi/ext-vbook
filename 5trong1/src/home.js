function execute() {
    return Response.success([

        // 热门作品排行
        {title: "Q票榜", input: "/rank/yuepiao/year{year}-month{month}-page{page}/", script: "gen.js"},
        {title: "Q票榜[-1]", input: "/rank/yuepiao/-1year{year}-month{month}-page{page}/", script: "gen.js"},        
        {title: "Q票榜[-2]", input: "/rank/yuepiao/-1year{year}-month{month}-page{page}/", script: "gen.js"},
        {title: "Q24热销榜", input: "/rank/hotsales/page{page}/", script: "gen.js"},
        {title: "Q阅榜", input: "/rank/readindex/page{page}/", script: "gen.js"},
        {title: "Q推荐票", input: "/rank/recom/page{page}/", script: "gen.js"},
        {title: "Q收藏", input: "/rank/collect/page{page}/", script: "gen.js"},
        {title: "Q更新", input: "/rank/vipup/page{page}/", script: "gen.js"},
        {title: "Fanqie Tuần", input: "?find=&host=fanqie&minc=0&sort=viewweek&step=1&tag=", script: "gen1.js"},
        {title: "Fanqie Ngày", input: "?find=&host=fanqie&minc=0&sort=viewday&step=1&tag=", script: "gen1.js"},
        {title: "Fanqie đánh dấu", input: "?find=&host=fanqie&minc=0&sort=bookmarked&tag=", script: "gen1.js"},
        {title: "Fanqie like", input: "?find=&host=fanqie&minc=0&sort=like&tag=", script: "gen1.js"},
        {title: "Qidian Tuần", input: "?find=&host=qidian&minc=0&sort=viewweek&step=1&tag=", script: "gen1.js"},
        {title: "Qidian Ngày", input: "?find=&host=qidian&minc=0&sort=viewday&step=1&tag=", script: "gen1.js"}
    ]);
}