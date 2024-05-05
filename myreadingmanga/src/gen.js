
function execute(url, page) {
    if (!page) page = '1';
    url = url + "/page/" + page + "/"
    var browser = Engine.newBrowser();
    browser.setUserAgent(UserAgent.android());
    var doc = browser.launch(url, 5000);
    let data = [];
    let next = (parseInt(page) + 1).toString()
    doc.select("article").forEach(e => {
        let coverImg = e.select(".entry-image-link img").attr("data-src");
        data.push({
            name: e.select(".entry-title-link").text(),
            link: e.select(".entry-title-link").attr("href"),
            cover: coverImg,
        });

    });
    return Response.success(data, next);
}