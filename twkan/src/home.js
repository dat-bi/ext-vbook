function execute() {
    return Response.success([
        {title: "全部分类", input: "/novels/full/0_{0}.html", script: "gen.js"},
        {title: "言情小说", input: "/novels/full/3_{0}.html", script: "gen.js"},
        {title: "玄幻魔法", input: "/novels/full/1_{0}.html", script: "gen.js"},
        {title: "修真武侠", input: "/novels/full/2_{0}.html", script: "gen.js"},
        {title: "穿越时空", input: "/novels/full/11_{0}.html", script: "gen.js"},
        {title: "都市小说", input: "/novels/full/9_{0}.html", script: "gen.js"},
        {title: "历史军事", input: "/novels/full/4_{0}.html", script: "gen.js"},
        {title: "游戏竞技", input: "/novels/full/5_{0}.html", script: "gen.js"},
        {title: "科幻空间", input: "/novels/full/6_{0}.html", script: "gen.js"},
        {title: "悬疑惊悚", input: "/novels/full/7_{0}.html", script: "gen.js"},
        {title: "同人小说", input: "/novels/full/8_{0}.html", script: "gen.js"},
        {title: "官场职场", input: "/novels/full/10_{0}.html", script: "gen.js"},
        {title: "青春校园", input: "/novels/full/12_{0}.html", script: "gen.js"},
    ]);
}