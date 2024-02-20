function execute() {
    return Response.success([
        { title: "BL Hoàn", input: "/category/bl-hoan/", script: "gen.js" },
        { title: "BL Ongoing", input: "/category/bl-ongoing/", script: "gen.js" },
        { title: "BL Ngắn", input: "/category/bl-ngan/", script: "gen.js" },
        { title: "BL Novel", input: "/category/bl-novel/", script: "gen.js" },
        { title: "BL Drop", input: "/category/bl-drop/", script: "gen.js" },
        { title: "BL Manga", input: "/danh-sach-bl-manga/", script: "gen.js" },
        { title: "BL Manhwa", input: "/danh-sach-bl-manhwa/", script: "gen.js" },
        { title: "BL Manhua", input: "/danh-sach-bl-manhua/", script: "gen.js" },
        { title: "BL Webtoon", input: "/bl-webtoon/", script: "gen.js" },
        { title: "Non-BL", input: "/non-bl/", script: "gen.js" },
        { title: "FAQs (pass)", input: "/qa/", script: "gen.js" },
    ]);
}
// console.log([...document.querySelectorAll('body > div.logo2 > div:nth-child(36) a')].map(e => `{title: "${e.innerText}", input: "${e.href.replace(/^(?:\/\/|[^/]+)*/, '')}", script: "gen.js"},`).join('\n'));