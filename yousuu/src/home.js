function execute() {
    return Response.success([
        // {title: "新书入库", input: "https://www.yousuu.com/newbooks", script: "gen.js"},
        {title: "今日热门小说", input: "https://www.yousuu.com/rank/today", script: "gen.js"},
        {title: "呵护幼苗", input: "https://www.yousuu.com/rank/week-0", script: "gen.js"},
        {title: "龙粮种草", input: "https://www.yousuu.com/rank/week-1", script: "gen.js"},
        {title: "优秀新书推荐", input: "https://www.yousuu.com/rank/new", script: "gen.js"},
        {title: "在读指数总榜", input: "https://www.yousuu.com/rank/readIndex", script: "gen.js"},
        {title: "男频周热门榜", input: "https://www.yousuu.com/rank/weekHot?channel=male", script: "gen.js"},
        {title: "女频周热门榜", input: "https://www.yousuu.com/rank/weekHot?channel=female", script: "gen.js"}

    ]);
}