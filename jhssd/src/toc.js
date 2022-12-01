function execute(url) {
    var browser = Engine.newBrowser();
    browser.setUserAgent(UserAgent.android());
    var doc = browser.launch(url, 4000);
    browser.close()
    const data  = [];
    var el = doc.select(".chapter").last().select("li")
        for (var i = 0; i < el.size(); i++) {
        var e = el.get(i);
            data.push({
                name: e.select("a").text(),
                url: "https://m.2ksk.com" + e.select("a").attr("href"),
                host: "https://m.2ksk.com"
            })
        }                
    return Response.success(data);
}

