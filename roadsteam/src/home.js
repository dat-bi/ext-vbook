function execute() {
    return Response.success([
        { title: "manhwa", input: "/manga-genre/manhwa/", script: "gen.js" },
        { title: "manga", input: "/manga-genre/manga/", script: "gen.js" },
    ]);
}
// console.log([...document.querySelectorAll('body > div.logo2 > div:nth-child(36) a')].map(e => `{title: "${e.innerText}", input: "${e.href.replace(/^(?:\/\/|[^/]+)*/, '')}", script: "gen.js"},`).join('\n'));