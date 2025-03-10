function execute() {
    return Response.success([
        { title: "Truyện mới cập nhật", input: "truyen-moi-cap-nhat", script: "gen.js" },
        { title: "truyện hot", input: "truyen-duoc-de-cu", script: "gen.js" }
    ]);
}
//
// console.log([...document.querySelectorAll('.dropdown-menu li a')].map(e => `{title: "${e.innerText}", input: "${e.href.replace(/^(?:\/\/|[^/]+)*/, '')}", script: "gen.js"},`).join('\n'));