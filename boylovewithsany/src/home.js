function execute() {
    return Response.success([
        { title: "Manhwa", input: "/manhwa/", script: "gen.js" },
        { title: "Manga List ", input: "/manga-list/", script: "gen.js" },
    ]);
}
// console.log([...document.querySelectorAll('body > div.logo2 > div:nth-child(36) a')].map(e => `{title: "${e.innerText}", input: "${e.href.replace(/^(?:\/\/|[^/]+)*/, '')}", script: "gen.js"},`).join('\n'));