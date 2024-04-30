
function execute(url) {
    var browser = Engine.newBrowser();
    browser.setUserAgent(UserAgent.android());
    var doc = browser.launch(url, 5000);
    browser.close()
    let list = [];
    list.push({
        name: "Chap 1",
        url: url
    });
    let a = doc.select(".entry-pagination.pagination")
    if (a.html().length > 100) {
        console.log("ASdsdf")
    }
    a.select("a").forEach(e => list.push({
        name: "Chap " +  e.text(),
        url: e.attr("href")
    }));
    return Response.success(list);

}