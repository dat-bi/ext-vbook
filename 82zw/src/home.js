function execute() {
    return Response.success([
        {title: "玄幻小说", input: "xuanhuanxiaoshuo", script: "gen.js"},
        {title: "修真小说", input: "xiuzhenxiaoshuo", script: "gen.js"},
        {title: "都市小说", input: "dushixiaoshuo", script: "gen.js"},
        {title: "穿越小说", input: "chuanyuexiaoshuo", script: "gen.js"},
        {title: "网游小说", input: "wangyouxiaoshuo", script: "gen.js"},
        {title: "科幻小说", input: "kehuanxiaoshuo", script: "gen.js"},
        {title: "女生小说", input: "nvshengxiaoshuo", script: "gen.js"},
        {title: "排行榜单", input: "paihangbang", script: "gen.js"},
        {title: "全部小说", input: "xiaoshuodaquan", script: "gen.js"},
    ]);
}
