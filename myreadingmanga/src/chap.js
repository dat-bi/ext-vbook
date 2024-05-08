
function execute(url) {
    var browser = Engine.newBrowser();
    browser.setUserAgent(UserAgent.android());
    var doc = browser.launch(url, 5000);
    let data = [];
    doc.select(".entry-content img").forEach(e => {
        let img = e.attr("data-src")
        if (img) {
            data.push(img);
        }
    });
    return Response.success(data);
}