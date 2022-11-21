function execute(url) {
    var browser = Engine.newBrowser();
    var doc = browser.launch(url, 5000);
    browser.close()
    let htm = doc.select("._2Zphx");
        return Response.success({
            name: doc.select(".name").text(),
            cover: "https://www.ddxs.com/img/3/3183.jpg",
            author: doc.select(".s-image-wrap").attr("src"),
            description: doc.select(".sign ").text(),
            detail: null,
            host: url
        });
}