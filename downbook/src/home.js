function execute() {
    return Response.success([
        {title: "最近更新", input: "/book/html/newlist-1.html", script: "gen.js"},

    ]);
}
//console.log([...document.querySelectorAll('body > div.nav > div a')].map(e => `{title: "${e.innerText}", input: "${e.href.replace(/^(?:\/\/|[^/]+)*/, '')}", script: "gen.js"},`).join('\n'));