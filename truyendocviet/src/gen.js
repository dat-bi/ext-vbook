function execute(url, page) {
    if (!page) page = "1";
    var browser = Engine.newBrowser();
    let url1 = "https://truyendocviet.vn/" + url + "/page-" + page + ".html"
    console.log(url1)
    var doc = browser.launch(url1, 5000);
    browser.close()
    var el = doc.select(".sg-product");
    var novelList = [];
    var next = parseInt(page) + 1;
    for (var i = 0; i < el.size(); i++) {
        var e = el.get(i);
        novelList.push({
            name: e.select(".product-thumb a").attr("title"),
            link: "https://truyendocviet.vn" + e.select(".product-thumb a").attr("href"),
            description: e.select(".sg-rating").text(),
            cover: "https://truyendocviet.vn" + e.select(".product-thumb a img").attr("src")
        });
    }
    return Response.success(novelList, next);
}