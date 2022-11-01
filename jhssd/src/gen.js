function execute(key, page) {
    if (!page) page = 1;
    // var page = page + ''
    let browser = Engine.newBrowser();
    browser.setUserAgent(UserAgent.android());
    var doc = browser.launch( 'https://wap.jhssd.com'+key + page + '.html', 4000)
    browser.close()

        let el = doc.select("#Ranking ul")
        let data = [];
    for (var i = 0; i < el.size(); i++) {
        var e = el.get(i);
        data.push({
            name: e.select("li.tjxs > span:nth-child(1) > a ").text(),
            link: 'https://wap.jhssd.com' + e.select(".tjimg a").attr("href"),
            cover: 'https://wap.jhssd.com' + e.select(".tjimg a img").attr("src"),
            description: e.select(".xsm").last().text(),
            host: "https://wap.jhssd.com"
        })
    }
        return Response.success(data)

}