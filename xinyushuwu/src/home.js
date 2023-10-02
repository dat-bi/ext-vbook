function execute() {
    return Response.success([
        { title: "总点击榜", input: "/paihang/allvisit_{0}.html", script: "gen1.js" },
        { title: "月点击榜", input: "/paihang/monthvisit_{0}.html", script: "gen1.js" },
        { title: "周点击榜", input: "/paihang/weekvisit_{0}.html", script: "gen1.js" },
        { title: "总推荐榜", input: "/paihang/allvote_{0}.html", script: "gen1.js" },
        { title: "月推荐榜", input: "/paihang/monthvote_{0}.html", script: "gen1.js" },
        { title: "周推荐榜", input: "/paihang/weekvote_{0}.html", script: "gen1.js" },
        { title: "总收藏榜", input: "/paihang/goodnum_{0}.html", script: "gen1.js" },
        { title: "总字数榜", input: "/paihang/size_{0}.html", script: "gen1.js" },
        { title: "最新入库", input: "/paihang/postdate_{0}.html", script: "gen1.js" },
        { title: "最近更新", input: "/paihang/lastupdate_{0}.html", script: "gen1.js" },
    ]);
}