function execute() {
    return Response.success([
            {title: "⚡ Mới Cập Nhật", input: "/danh-sach?sort=update", script: "gen.js"},
            {title: "✌ Truyện Mới", input: "/danh-sach?sort=top", script: "gen.js"},
            {title: "🔥 Được Xem Nhiều", input: "/danh-sach?sort=top", script: "gen.js"},
            {title: "✅ Được Thích Nhiều", input: "/danh-sach?sort=like", script: "gen.js"},
    ]);
}
// console.log([...document.querySelectorAll('body > div.logo2 > div:nth-child(36) a')].map(e => `{title: "${e.innerText}", input: "${e.href.replace(/^(?:\/\/|[^/]+)*/, '')}", script: "gen.js"},`).join('\n'));