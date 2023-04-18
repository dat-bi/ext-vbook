function execute() {
    return Response.success([
        { title: "Top ngày", input: "/top-ngay.html", script: "gen.js" },
        { title: "Top tuần", input: "/top-tuan.html", script: "gen.js" },
        { title: "Top tháng", input: "/top-thang.html", script: "gen.js" },
        { title: "Top năm", input: "/top-nam.html", script: "gen.js" },
        { title: "FULL", input: "/truyen-hoan-thanh.html", script: "gen.js" },
        { title: "Truyện mới", input: "/truyen-tranh-moi.html", script: "gen.js" },
    ]);
}
// console.log([...document.querySelectorAll('body > div.logo2 > div:nth-child(36) a')].map(e => `{title: "${e.innerText}", input: "${e.href.replace(/^(?:\/\/|[^/]+)*/, '')}", script: "gen.js"},`).join('\n'));