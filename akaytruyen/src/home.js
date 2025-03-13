function execute() {
    return Response.success([
        { title: "home", input: "https://akaytruyen.com/", script: "gen.js" },
    ]);
}
//
// console.log([...document.querySelectorAll('.dropdown-menu li a')].map(e => `{title: "${e.innerText}", input: "${e.href.replace(/^(?:\/\/|[^/]+)*/, '')}", script: "gen.js"},`).join('\n'));