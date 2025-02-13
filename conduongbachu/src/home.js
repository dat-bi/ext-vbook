function execute() {
    return Response.success([
        { title: "Con Đường Bá Chủ", input: "https://conduongbachu.net/", script: "gen.js" },
    ]);
}
//
// console.log([...document.querySelectorAll('.dropdown-menu li a')].map(e => `{title: "${e.innerText}", input: "${e.href.replace(/^(?:\/\/|[^/]+)*/, '')}", script: "gen.js"},`).join('\n'));