function execute(url) {
    let browser = Engine.newBrowser();
    var doc = browser.launch(url, 5000);
    browser.close()
    var story_id = doc.select("#main-container > script") + ""
    story_id = story_id.match(/\d+/g)[0]
    var data = []
    var chapJson = Http.post("https://ntruyen.top/ajax/load_chapter").params({
            "story_id": story_id,
            "page": 1
        }).string()
    let json = JSON.parse(chapJson)
    let chapters = json.chapters
    let doc = Html.parse(chapters)
    let total = json.total
    var page = Math.ceil(total/100);
    for(let  i = 1; i <= page ; i++){
        data.push(story_id + "/" + i)
    }
    return Response.success(data);
}