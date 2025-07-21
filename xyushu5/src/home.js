function execute() {
    return Response.success([
        {title: "最近更新", input: "/top/lastupdate", script: "gen.js"},
        {title: "总排行榜", input: "/top/allvisit", script: "gen.js"},
        {title: "总推荐榜", input: "/top/allvote", script: "gen.js"},
        {title: "月排行榜", input: "/top/monthvisit", script: "gen.js"},
        {title: "月推荐榜", input: "/top/monthvote", script: "gen.js"},
        {title: "周排行榜", input: "/top/weekvisit", script: "gen.js"},
        {title: "周推荐榜", input: "/top/weekvote", script: "gen.js"}
    ]);
}
