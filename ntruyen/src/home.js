function execute(url) {
    let response = fetch("https://ntruyen.vn/")
    if (response.ok) {
        let doc = response.html()
        var data = []
        let el = doc.select("#main-nav > div > div.sort-dropdown > ul a")
        el.forEach(e => {
            data.push({
                title: e.text(),
                input: e.attr("href").replace("https://ntruyen.vn/",""),
                script: "gen.js"
            })
        }
        )
        data.shift()
    }
    return Response.success(data)
}