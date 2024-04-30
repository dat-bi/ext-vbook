
function execute(url) {
    // url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    // url = encodeURIComponent(url)
    // url = decodeURIComponent(url)
    var browser = Engine.newBrowser();
    browser.setUserAgent(UserAgent.android());
    var doc = browser.launch(url, 5000);
    browser.close()
    let coverImg = doc.select(".entry-content > div img").first().attr("data-src");
    return Response.success({
        name: doc.select("h1.entry-title").first().text(),
        cover: coverImg,
        author: null,
        description: doc.select(".entry-header").first().html()
    });
}