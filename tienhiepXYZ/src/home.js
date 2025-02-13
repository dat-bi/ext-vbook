function execute() {
    return Response.success([
        { title: "Truyện mới cập nhật", input: "/danh-sach/truyen-moi-cap-nhat", script: "gen.js" },
        { title: "truyện hot", input: "/danh-sach/truyen-xem-nhieu", script: "gen.js" },
        { title: "Truyện mới đăng", input: "/danh-sach/truyen-moi-dang", script: "gen.js" },
        { title: "Truyện hoàn thành", input: "/danh-sach/truyen-hoan-thanh", script: "gen.js" },
    ]);
}
//
// console.log([...document.querySelectorAll('.dropdown-menu li a')].map(e => `{title: "${e.innerText}", input: "${e.href.replace(/^(?:\/\/|[^/]+)*/, '')}", script: "gen.js"},`).join('\n'));