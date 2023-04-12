function execute(url) {
    let re = fetch(url).html();
    let el = re.select(".py-5.px-5.bg-auto.rounded-md.text-sm > ul > li > ul li a")
    let data = [];
    el.forEach(e => data.push({
        input: e.attr("href"),
        title: e.text().replace("Xếp hạng ",""),
        script: "gen.js"
    }))
    return Response.success(data)
}
// console.log([...document.querySelectorAll('#app > main > section > div > div > div > div.hidden.lg\:block.lg\:col-span-1.py-5.px-5.bg-auto.rounded-md.text-sm > ul > li ul li a')].map(e => `{title: "${e.innerText}", input: "${e.href.replace(/^(?:\/\/|[^/]+)*/, '')}", script: "gen.js"},`).join('\n'));