function execute() {
    return Response.success([
            {title: "玄幻奇幻", input: "/TXT/list4_1.html", script: "gen.js"},
            {title: "武侠仙侠", input: "/TXT/list5_1.html", script: "gen.js"},
            {title: "都市重生", input: "/TXT/list6_1.html", script: "gen.js"},
            {title: "历史军事", input: "/TXT/list7_1.html", script: "gen.js"},
            {title: "恐怖推理", input: "/TXT/list8_1.html", script: "gen.js"},
            {title: "科幻网游", input: "/TXT/list9_1.html", script: "gen.js"},
            {title: "二次元", input: "/TXT/list25_1.html", script: "gen.js"},
            {title: "都市言情", input: "/TXT/list10_1.html", script: "gen.js"},
            {title: "古代言情", input: "/TXT/list11_1.html", script: "gen.js"},
            {title: "穿越重生", input: "/TXT/list12_1.html", script: "gen.js"},
            {title: "玄幻仙侠", input: "/TXT/list13_1.html", script: "gen.js"},
            {title: "青春同人", input: "/TXT/list14_1.html", script: "gen.js"},
            {title: "网游科幻", input: "/TXT/list15_1.html", script: "gen.js"},
            {title: "现代耽美", input: "/TXT/list27_1.html", script: "gen.js"},
            {title: "古代架空", input: "/TXT/list28_1.html", script: "gen.js"},
            {title: "穿越重生", input: "/TXT/list29_1.html", script: "gen.js"},
            {title: "玄幻科幻", input: "/TXT/list30_1.html", script: "gen.js"},
            {title: "BL同人", input: "/TXT/list31_1.html", script: "gen.js"},
            {title: "GL百合", input: "/TXT/list32_1.html", script: "gen.js"},
    ]);
}
//console.log([...document.querySelectorAll('body > div.nav > div a')].map(e => `{title: "${e.innerText}", input: "${e.href.replace(/^(?:\/\/|[^/]+)*/, '')}", script: "gen.js"},`).join('\n'));