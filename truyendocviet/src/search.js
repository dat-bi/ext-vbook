function execute(key) {
    var key = encodeURIComponent(key)
    var browser = Engine.newBrowser();
    let url = "https://truyendocviet.vn/tim-kiem.html?q=" + key
    var doc = browser.launch(url, 5000);
    browser.close()
    var el = doc.select(".sg-product");
    var novelList = [];
    for (var i = 0; i < el.size(); i++) {
        var e = el.get(i);
        novelList.push({
            name: e.select(".product-thumb a").attr("title"),
            link: "https://truyendocviet.vn" + e.select(".product-thumb a").attr("href"),
            description: e.select(".sg-rating").text(),
            cover: "https://truyendocviet.vn" + e.select(".product-thumb a img").attr("src")
        });
    }
    return Response.success(novelList);
}
