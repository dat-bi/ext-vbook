function execute(url) {
    var browser = Engine.newBrowser();
    var doc = browser.launch(url, 5000);
    browser.close()
    var el = doc.select("#list-chapters tbody td a");
    const data = [];
    for (let i = 0; i < el.size(); i++) {
        let e = el.get(i);
        data.push({
            name: e.text(),
            url: "https://truyendocviet.vn" + e.attr("href"),
            
        });
    }
    return Response.success(data);
}