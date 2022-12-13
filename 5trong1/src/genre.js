function execute() {

    let data = [
        '玄幻|xuanhuan|21',
        '奇幻|qihuan|1',
        '武侠|wuxia|2',
        '仙侠|xianxia|22',
        '都市|dushi|4',
        '现实|xianshi|15',
        '军事|junshi|6',
        '历史|lishi|5',
        '游戏|youxi|7',
        '体育|tiyu|8',
        '科幻|kehuan|9',
        '悬疑|lingyi|10',
        '轻小说|2cy|12',
    ];

    data.forEach((item, index) => {
        let p = data[index].split('|');
        data[index] = {
            title: p[0],
            input: p[2],
            script: "cat.js"
        };
    })
    var data2 = [        
        {title: "🧡玄幻1", input: "/rank/yuepiao/chn21/year{year}-month{month}-page{page}/", script: "gen.js"},        
        {title: "奇幻1", input: "/rank/yuepiao/chn1/year{year}-month{month}-page{page}/", script: "gen.js"},        
        {title: "武侠1", input: "/rank/yuepiao/chn2/year{year}-month{month}-page{page}/", script: "gen.js"},        
        {title: "仙侠1", input: "/rank/yuepiao/chn22/year{year}-month{month}-page{page}/", script: "gen.js"},        
        {title: "都市1", input: "/rank/yuepiao/chn4/year{year}-month{month}-page{page}/", script: "gen.js"},
        {title: "现实1", input: "/rank/yuepiao/chn15/year{year}-month{month}-page{page}/", script: "gen.js"},        
        {title: "军事1", input: "/rank/yuepiao/chn6/year{year}-month{month}-page{page}/", script: "gen.js"},
        {title: "历史1", input: "/rank/yuepiao/chn5/year{year}-month{month}-page{page}/", script: "gen.js"},
        {title: "游戏1", input: "/rank/yuepiao/chn7/year{year}-month{month}-page{page}/", script: "gen.js"},
        {title: "体育1", input: "/rank/yuepiao/chn8/year{year}-month{month}-page{page}/", script: "gen.js"},        
        {title: "科幻1", input: "/rank/yuepiao/chn9/year{year}-month{month}-page{page}/", script: "gen.js"},
        {title: "诸天无限1", input: "/rank/yuepiao/chn20109/year{year}-month{month}-page{page}/", script: "gen.js"},
        {title: "悬疑1", input: "/rank/yuepiao/chn10/year{year}-month{month}-page{page}/", script: "gen.js"},        
        {title: "轻小说1", input: "/rank/yuepiao/chn12/year{year}-month{month}-page{page}/", script: "gen.js"},
        {title: "❤玄幻-1", input: "/rank/yuepiao-1/chn21/year{year}-month{month}-page{page}/", script: "gen.js"},        
        {title: "奇幻-1", input: "/rank/yuepiao-1/chn1/year{year}-month{month}-page{page}/", script: "gen.js"},        
        {title: "武侠-1", input: "/rank/yuepiao-1/chn2/year{year}-month{month}-page{page}/", script: "gen.js"},        
        {title: "仙侠-1", input: "/rank/yuepiao-1/chn22/year{year}-month{month}-page{page}/", script: "gen.js"},        
        {title: "都市-1", input: "/rank/yuepiao-1/chn4/year{year}-month{month}-page{page}/", script: "gen.js"},
        {title: "现实-1", input: "/rank/yuepiao-1/chn15/year{year}-month{month}-page{page}/", script: "gen.js"},        
        {title: "军事-1", input: "/rank/yuepiao-1/chn6/year{year}-month{month}-page{page}/", script: "gen.js"},
        {title: "历史-1", input: "/rank/yuepiao-1/chn5/year{year}-month{month}-page{page}/", script: "gen.js"},
        {title: "游戏-1", input: "/rank/yuepiao-1/chn7/year{year}-month{month}-page{page}/", script: "gen.js"},
        {title: "体育-1", input: "/rank/yuepiao-1/chn8/year{year}-month{month}-page{page}/", script: "gen.js"},        
        {title: "科幻-1", input: "/rank/yuepiao-1/chn9/year{year}-month{month}-page{page}/", script: "gen.js"},
        {title: "诸天无限-1", input: "/rank/yuepiao-1/chn20109/year{year}-month{month}-page{page}/", script: "gen.js"},
        {title: "悬疑-1", input: "/rank/yuepiao-1/chn10/year{year}-month{month}-page{page}/", script: "gen.js"},        
        {title: "轻小说-1", input: "/rank/yuepiao-1/chn12/year{year}-month{month}-page{page}/", script: "gen.js"}
    ]
    data = data.concat(data2)
    return Response.success(data);
}