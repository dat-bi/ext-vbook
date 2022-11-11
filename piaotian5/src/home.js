function execute() {
    return Response.success([
        {title: "首页", input: "/", script: "gen.js"},
        {title: "玄幻小说", input: "/xuanhuan/", script: "gen.js"},
        {title: "仙侠小说", input: "/xianxia/", script: "gen.js"},
        {title: "都市小说", input: "/dushi/", script: "gen.js"},
        {title: "历史小说", input: "/lishi/", script: "gen.js"},
        {title: "侦探推理", input: "/zhentan/", script: "gen.js"},
        {title: "网游小说", input: "/wangyou/", script: "gen.js"},
        {title: "科幻小说", input: "/kehuan/", script: "gen.js"},
        {title: "恐怖灵异", input: "/kongbu/", script: "gen.js"},
        {title: "其他小说", input: "/othersbooks/", script: "gen.js"},
        {title: "全本小说", input: "/quanben/", script: "gen.js"},
    ]);
}