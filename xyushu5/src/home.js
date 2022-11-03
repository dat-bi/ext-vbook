function execute() {
    return Response.success([
        {title: "最近更新", input: "/top/lastupdate", script: "zen.js"},
        {title: "总排行榜", input: "/top/allvisit", script: "zen.js"},
        {title: "总推荐榜", input: "/top/allvote", script: "zen.js"},
        {title: "月排行榜", input: "/top/monthvisit", script: "zen.js"},
        {title: "月推荐榜", input: "/top/monthvote", script: "zen.js"},
        {title: "周排行榜", input: "/top/weekvisit", script: "zen.js"},
        {title: "周推荐榜", input: "/top/weekvote", script: "zen.js"}
    ]);
}
