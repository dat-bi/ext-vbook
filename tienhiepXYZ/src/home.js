function execute() {
    return Response.success([
        { title: "Truyện mới cập nhật", input: "/danh-sach/truyen-moi/", script: "gen.js" },
        { title: "truyện hot", input: "/danh-sach/truyen-full/", script: "gen.js" }
    ]);
}
//
// console.log([...document.querySelectorAll('.dropdown-menu li a')].map(e => `{title: "${e.innerText}", input: "${e.href.replace(/^(?:\/\/|[^/]+)*/, '')}", script: "gen.js"},`).join('\n'));