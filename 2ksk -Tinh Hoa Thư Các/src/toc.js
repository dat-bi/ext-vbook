function execute(url) {
    var browser = Engine.newBrowser();
    var doc = browser.launch(url, 4000);
    browser.close()
    const data  = [];
    
    var el = doc.select(".version-chap li")
    el.select("em").remove()
        for (var i = 0; i < el.size(); i++) {
        var e = el.get(i);
            data.push({
                name: e.select("a").text(),
                url: "https://manhwa3xx.com/" + e.select("a").attr("href"),
                host: "https://manhwa3xx.com/"
            })
        }                
    return Response.success(data);
}

