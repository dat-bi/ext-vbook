function execute() {
    return Response.success([
        { title: "Top ngày", input: "/top-ngay", script: "gen.js" },
        { title: "Top tuần", input: "/top-tuan", script: "gen.js" },
        { title: "Top tháng", input: "/top-thang", script: "gen.js" },
        { title: "Top năm", input: "/top-nam", script: "gen.js" },
        { title: "FULL", input: "/truyen-hoan-thanh", script: "gen.js" },
        { title: "Truyện mới", input: "/truyen-tranh-moi", script: "gen.js" },
    ]);
}
// console.log([...document.querySelectorAll('body > div.logo2 > div:nth-child(36) a')].map(e => `{title: "${e.innerText}", input: "${e.href.replace(/^(?:\/\/|[^/]+)*/, '')}", script: "gen.js"},`).join('\n'));