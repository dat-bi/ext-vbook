function execute() {
    return Response.success([
        { title: "Bara", input: "https://myreadingmanga.info/genre/bara/", script: "gen.js" },
        { title: "manga", input: "https://myreadingmanga.info/yaoi-manga/", script: "gen.js" },
    ]);
}
// console.log([...document.querySelectorAll('body > div.logo2 > div:nth-child(36) a')].map(e => `{title: "${e.innerText}", input: "${e.href.replace(/^(?:\/\/|[^/]+)*/, '')}", script: "gen.js"},`).join('\n'));