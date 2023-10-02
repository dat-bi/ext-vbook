function execute() {
    return Response.success([
        {title: "玄幻小说", input: "/xuanhuan/{0}.html", script: "gen.js"},
        {title: "仙侠小说", input: "/xianxia/{0}.html", script: "gen.js"},
        {title: "都市小说", input: "/dushi/{0}.html", script: "gen.js"},
        {title: "军史小说", input: "/junshi/{0}.html", script: "gen.js"},
        {title: "网游小说", input: "/wangyou/{0}.html", script: "gen.js"},
        {title: "科幻小说", input: "/kehuan/{0}.html", script: "gen.js"},
        {title: "耽美小说", input: "/danmei/{0}.html", script: "gen.js"},
        {title: "辣文合集", input: "/lawen/{0}.html", script: "gen.js"},
    ]);
}