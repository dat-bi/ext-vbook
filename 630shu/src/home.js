function execute() {
    return Response.success([
        {title: "玄幻小说", input: 'list/1', script: "gen.js"},
        {title: "言情小说", input: 'list/2', script: "gen.js"},
        {title: "仙侠修真", input: 'list/3', script: "gen.js"},
        {title: "都市小说", input: 'list/4', script: "gen.js"},
        {title: "历史小说", input: 'list/5', script: "gen.js"},
        {title: "网游小说", input: 'list/6', script: "gen.js"},
        {title: "竞技小说", input: 'list/7', script: "gen.js"},
        {title: "科幻小说", input: 'list/8', script: "gen.js"},
    ]);
}