function execute() {
    return Response.success([
        { title: "Truyện mới cập nhật", input: "/truyen-moi-cap-nhat.html", script: "gen.js" },
        { title: "Truyện full", input: "/truyen-hoan-thanh.html", script: "gen.js" },
        { title: "Truyện hot", input: "/truyen-tranh-hot.html", script: "gen.js" },
    ]);
}
// console.log([...document.querySelectorAll('body > div.logo2 > div:nth-child(36) a')].map(e => `{title: "${e.innerText}", input: "${e.href.replace(/^(?:\/\/|[^/]+)*/, '')}", script: "gen.js"},`).join('\n'));