function execute() {
    return Response.success([
        {title: "玄幻小说", input: "xuanhuan", script: "gen.js"},
        {title: "武侠小说", input: "wuxia", script: "gen.js"},
        {title: "军事小说", input: "junshi", script: "gen.js"},
        {title: "历史架空", input: "dushi", script: "gen.js"},
        {title: "游戏小说", input: "youxi", script: "gen.js"}
    ]);
}