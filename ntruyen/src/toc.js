function execute(url) {
    let story_id = url.split("/")[0]
    let page = url.split("/")[1]
    var listchapter = []
    // var chapJson = Http.post("https://ntruyen.vn//ajax/load_chapter").params({
    //     "story_id": story_id,
    //     "page": page
    // }).string()
    var chapJson = fetch("https://ntruyen.vn//ajax/load_chapter", {
        method: "POST",
        body: {
            "story_id": story_id,
            "page": page
        }
    }).text()
    let json = JSON.parse(chapJson)
    let chapters = json.chapters
    let doc = Html.parse(chapters)
    var el = doc.select("li a")
    el.forEach(e => listchapter.push({
        name: e.text(),
        url: e.attr("href"),
        host: "https://ntruyen.vn"
    }))

    return Response.success(listchapter)
}