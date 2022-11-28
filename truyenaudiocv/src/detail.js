function execute(url) {
    var browser = Engine.newBrowser();
    browser.setUserAgent(UserAgent.android());
    var doc = browser.launch(url, 4000);
    browser.close()
    if (doc) {
        return Response.success({
            name: doc.select(".title").text(),
            cover:doc.select(".col-lg-pull-6.col-lg-3 > div > img").attr("src"),
            host: "https://truyenaudiocvv.com",
            author: doc.select(".item-value span").first().text(),
            description: doc.select(".brief").text()
        });
    }
    return null;
}