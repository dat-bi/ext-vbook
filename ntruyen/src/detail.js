load('config.js');
function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);

    // var browser = Engine.newBrowser();
    // var doc = browser.launch(url, 5000);
    // browser.close()
    let response = fetch(url)
    let doc = response.html()
    let genres = []
    let genresText = []
    doc.select("header[itemtype='https://schema.org/Book'] a[itemprop='genre']").forEach(e => {
        let title = e.text()
        genresText.push(title)
        genres.push({
            title: title,
            input: e.attr("href"),
            script: "gen.js"
        })
    })
    let description = doc.select("article[itemprop='description'] [itemprop='description']").text()
    return Response.success({
        name : doc.select("header[itemtype='https://schema.org/Book'] h1[itemprop='name']").text(),
        cover : doc.select("header[itemtype='https://schema.org/Book'] img.object-cover.rounded-xl").attr("src"),
        host : BASE_URL,
        author : doc.select("header[itemtype='https://schema.org/Book'] [itemprop='author'] [itemprop='name']").text(),
        description : genresText.join(", ") + (description ? "<br>" + description : ""),
        genres : genres,
    });
}
