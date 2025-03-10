
function execute(url) {
    let urlnew = url.replace(".html", "/read/chapters.html")
    var browser = Engine.newBrowser();
    var doc = browser.launch(urlnew, 5000);
    browser.close()
    let el = doc.select(".page-link").last().attr("href").match(/\d+\.html/g)[0].replace(".html", "");
    let elx = parseInt(el)
    const data = [];
    urlnew = urlnew.replace(".html", "")
    for (let i = 1; i <= elx; i++) {
        data.push(urlnew + "/" + i + ".html");
    }
    return Response.success(data);
}