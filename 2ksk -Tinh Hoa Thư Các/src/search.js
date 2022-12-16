function execute(key, page) {
    if (!page) page = 1;
    url = 'https://m.2ksk.com/search.html?ie=utf-8&word='+key
    let browser = Engine.newBrowser();
    browser.setUserAgent(UserAgent.android());
    var doc = browser.launch(url, 4000)
    browser.close()

        let el = doc.select(".searchbook")
        let data = [];
    for (var i = 0; i < el.size(); i++) {
        var e = el.get(i);
        data.push({
            name: e.select(".bookname a ").text(),
            link: 'https://m.2ksk.com' + e.select(".bookimg a").attr("href"),
            cover: 'https://m.2ksk.com' + e.select(".bookimg a img").attr("src"),
            description: e.select(".author").text() + '   ' + e.select(".update a").text(),
            host: "https://m.2ksk.com"
        })
    }
        return Response.success(data)

}