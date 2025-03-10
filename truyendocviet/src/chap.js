function execute(url) {
    var browser = Engine.newBrowser();
    var doc = browser.launch(url, 5000);
    browser.close()
    let txt = doc.select("#noi_dung_chuong");
    txt.select("a").remove()
    txt.select("div").remove()
    txt.select("h1").remove()
    txt.select("h6").remove()
        txt.select("h5").remove()
    txt.select("p").remove()
    txt.select("h4").remove()
    return Response.success(txt);
}