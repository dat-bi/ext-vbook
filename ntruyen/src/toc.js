function execute(url) {
    let browser = Engine.newBrowser();
    var doc = browser.launch(url, 3000);
    browser.close()
    var story_id = doc.select("#main-container > script") + ""
    story_id = story_id.match(/\d+/g)[0]
    var page = 1
    var listchapter = []
    do {
        var chapJson = Http.post("https://ntruyen.vn/ajax/load_chapter").params({
            "story_id": story_id,
            "page": page
        }).string()
        page++
        let json = JSON.parse(chapJson)
        let chapters = json.chapters
        let doc = Html.parse(chapters)
        let total = json.total
        var pageMax = Math.round(total/100);   
        var el = doc.select("li a")
        el.forEach(e => listchapter.push({
            name: e.text(),
            url: e.attr("href"),
            host: "https://ntruyen.vn"
        }))
    } while (page <= pageMax)
    
    return Response.success(listchapter)
}