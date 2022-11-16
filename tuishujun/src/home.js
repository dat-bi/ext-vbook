function execute() {
    return Response.success([
        {title: "人气榜", input: "listHotBook", script: "gen.js"},
        {title: "新书榜", input: "https://www.tuishujun.com/rank/newest", script: "gen.js"}    
    ]);
}