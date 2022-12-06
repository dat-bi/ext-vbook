function execute() {
    return Response.success([
        {title: "TXT小说下载", input: "/TXT/list1_1.html", script: "gen.js"},
        {title: "女频下载", input: "/TXT/list2_1.html", script: "gen.js"},
        {title: "耽美下载", input: "/TXT/list26_1.html", script: "gen.js"},
        {title: "最近更新", input: "/book/html/newlist-1.html", script: "gen1.js"},
        {title: "热门排行", input: "/book/html/hotlist-1.html", script: "gen1.js"},
        {title: "小说专题", input: "/TXT/zt/1_1.html", script: "gen1.js"},
    ]);
}
//console.log([...document.querySelectorAll('body > div.nav > div a')].map(e => `{title: "${e.innerText}", input: "${e.href.replace(/^(?:\/\/|[^/]+)*/, '')}", script: "gen.js"},`).join('\n'));