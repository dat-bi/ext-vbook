
function execute(url) {
    var browser = Engine.newBrowser();
    browser.setUserAgent(UserAgent.android());
    var doc = browser.launch(url, 5000);
    browser.close()
    let genres = [];
    let g =doc.select("header .entry-meta").last()
   g.select("a").forEach(e => {
        genres.push({
            title: e.text(),
            input: e.attr("href"),
            script: "gen.js"
        });
    });
    let coverImg = doc.select(".entry-content > div img").first().attr("data-src");
    return Response.success({
        name: doc.select("h1.entry-title").first().text(),
        cover: coverImg,
        author: null,
        genres: genres,
        description: doc.select(".entry-header").first().html()
    });
}