function execute() {
    return Response.success([

        // 热门作品排行
        {title: "Q票榜", input: "/rank/yuepiao/year{year}-month{month}-page{page}/", script: "gen.js"},
        {title: "Q票榜[-1]", input: "/rank/yuepiao/-1year{year}-month{month}-page{page}/", script: "gen.js"},        
        {title: "Q票榜[-2]", input: "/rank/yuepiao/-1year{year}-month{month}-page{page}/", script: "gen.js"},
        {title: "Q24热销榜", input: "/rank/hotsales/page{page}/", script: "gen.js"},
        {title: "Q阅榜", input: "/rank/readindex/page{page}/", script: "gen.js"},
        {title: "Q推荐票", input: "/rank/recom/page{page}/", script: "gen.js"},
        {title: "Q收藏", input: "/rank/collect/page{page}/", script: "gen.js"},
        {title: "Q更新", input: "/rank/vipup/page{page}/", script: "gen.js"},
        {title: "Fanqie Tuần", input: "?find=&host=fanqie&minc=0&sort=viewweek&step=1&tag=", script: "gen1.js"},
        {title: "Fanqie Ngày", input: "?find=&host=fanqie&minc=0&sort=viewday&step=1&tag=", script: "gen1.js"},
        {title: "Qidian Tuần", input: "?find=&host=qidian&minc=0&sort=viewweek&step=1&tag=", script: "gen1.js"},
        {title: "Qidian Ngày", input: "?find=&host=qidian&minc=0&sort=viewday&step=1&tag=", script: "gen1.js"}
        // {title: "玄幻-1", input: "/rank/yuepiao-1/chn21/year{year}-month{month}-page{page}/", script: "gen.js"},        
        // {title: "奇幻-1", input: "/rank/yuepiao-1/chn1/year{year}-month{month}-page{page}/", script: "gen.js"},        
        // {title: "武侠-1", input: "/rank/yuepiao-1/chn2/year{year}-month{month}-page{page}/", script: "gen.js"},        
        // {title: "仙侠-1", input: "/rank/yuepiao-1/chn22/year{year}-month{month}-page{page}/", script: "gen.js"},        
        // {title: "都市-1", input: "/rank/yuepiao-1/chn4/year{year}-month{month}-page{page}/", script: "gen.js"},
        // {title: "现实-1", input: "/rank/yuepiao-1/chn15/year{year}-month{month}-page{page}/", script: "gen.js"},        
        // {title: "军事-1", input: "/rank/yuepiao-1/chn6/year{year}-month{month}-page{page}/", script: "gen.js"},
        // {title: "历史-1", input: "/rank/yuepiao-1/chn5/year{year}-month{month}-page{page}/", script: "gen.js"},
        // {title: "游戏-1", input: "/rank/yuepiao-1/chn7/year{year}-month{month}-page{page}/", script: "gen.js"},
        // {title: "体育-1", input: "/rank/yuepiao-1/chn8/year{year}-month{month}-page{page}/", script: "gen.js"},        
        // {title: "科幻-1", input: "/rank/yuepiao-1/chn9/year{year}-month{month}-page{page}/", script: "gen.js"},
        // {title: "诸天无限-1", input: "/rank/yuepiao-1/chn20109/year{year}-month{month}-page{page}/", script: "gen.js"},
        // {title: "悬疑-1", input: "/rank/yuepiao-1/chn10/year{year}-month{month}-page{page}/", script: "gen.js"},        
        // {title: "轻小说-1", input: "/rank/yuepiao-1/chn12/year{year}-month{month}-page{page}/", script: "gen.js"},

    ]);
}