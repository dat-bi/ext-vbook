function execute() {
    return Response.success([
            { title: "日点击榜", input: "/Ranking_dayvisit/", script: "gen.js" },
            { title: "周点击榜", input: "/Ranking_weekvisit/", script: "gen.js" },
            { title: "月点击榜", input: "/Ranking_monthvisit/", script: "gen.js" },
            { title: "总点击榜", input: "/Ranking_allvisit/", script: "gen.js" },
            { title: "周推荐榜", input: "/Ranking_weekvote/", script: "gen.js" },
            { title: "月推荐榜", input: "/Ranking_monthvote/", script: "gen.js" },
            { title: "总推荐榜", input: "/Ranking_allvote/", script: "gen.js" },
            { title: "收藏推荐", input: "/Ranking_goodnum/", script: "gen.js" },
            { title: "字数排行", input: "/Ranking_size/", script: "gen.js" },
            { title: "最新入库", input: "/Ranking_postdate/", script: "gen.js" },
            { title: "最近更新", input: "/Ranking_lastupdate/", script: "gen.js" },
            { title: "新书榜单", input: "/Ranking_goodnew/", script: "gen.js" }
    ]);
}



