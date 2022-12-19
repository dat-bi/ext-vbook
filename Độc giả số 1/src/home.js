function execute() {
    return Response.success([
            {title: "⚡ Mới Cập Nhật", input: "/danh-sach-truyen.html?sort=last_update&sort_type=DESC", script: "gen.js"},
            {title: "✌ Truyện Mới", input: "/danh-sach-truyen.html?sort=post&sort_type=DESC", script: "gen.js"},
            {title: "🔥 Được Xem Nhiều", input: "/danh-sach-truyen.html?sort=views&sort_type=DESC", script: "gen.js"},
            {title: "✅ Hoàn Thành", input: "/truyen-da-hoan-thanh.html", script: "gen.js"},
    ]);
}
// console.log([...document.querySelectorAll('body > div.logo2 > div:nth-child(36) a')].map(e => `{title: "${e.innerText}", input: "${e.href.replace(/^(?:\/\/|[^/]+)*/, '')}", script: "gen.js"},`).join('\n'));