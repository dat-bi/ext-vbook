function execute(url) {
    let response = fetch("https://ntruyen.top/")
    if (response.ok) {
        let doc = response.html()
        var data = []
        let el = doc.select("#main-nav > div > div.sort-dropdown > ul a")
        el.forEach(e => {
            data.push({
                title: e.text(),
                input: e.attr("href").replace("https://ntruyen.top/",""),
                script: "gen.js"
            })
        }
        )
        data.shift()
    }
    return Response.success(data)
}