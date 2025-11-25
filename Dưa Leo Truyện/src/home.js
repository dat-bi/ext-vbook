function execute() {
    return Response.success([
         { title: "Truyện hot ngày", input: "/the-loai/dam-my#top-day", script: "gen.js" },
        { title: "Truyện hot tháng", input: "/the-loai/dam-my#top-month", script: "gen.js" },
        { title: "Truyện mới cập nhật", input: "/truyen-tranh-moi", script: "gen.js" },
        { title: "Truyện full", input: "/truyen-hoan-thanh", script: "gen.js" },
    ]);
}
// console.log([...document.querySelectorAll('body > div.logo2 > div:nth-child(36) a')].map(e => `{title: "${e.innerText}", input: "${e.href.replace(/^(?:\/\/|[^/]+)*/, '')}", script: "gen.js"},`).join('\n'));