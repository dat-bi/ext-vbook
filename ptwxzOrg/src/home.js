function execute() {
    return Response.success([
        { title: "总点击", input: "/top/allvisit/", script: "gen.js" },
        { title: "月点击", input: "/top/monthvisit/", script: "gen.js" },
        { title: "周点击", input: "/top/weekvisit/", script: "gen.js" },
        { title: "日点击", input: "/top/dayvisit/", script: "gen.js" },
        { title: "总推荐", input: "/top/allvote/", script: "gen.js" },
        { title: "月推荐", input: "/top/monthvote/", script: "gen.js" },
        { title: "周推荐", input: "/top/weekvote/", script: "gen.js" },
        { title: "日推荐", input: "/top/dayvote/", script: "gen.js" },
        { title: "总收藏", input: "/top/goodnum/", script: "gen.js" },
        { title: "总字数", input: "/top/size/", script: "gen.js" },
        { title: "最新入库", input: "/top/postdate/", script: "gen.js" },
        { title: "最近更新", input: "/top/lastupdate/", script: "gen.js" },
    ]);
}