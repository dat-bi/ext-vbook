function execute(url) {
    var browser = Engine.newBrowser() // Khởi tạo browser
    let doc = browser.launch(url, 5000) // Mở trang web với timeout, trả về Document object
    let el1 = doc.select("#chapter-content")
    browser.close()
    el1 = Html.clean(el1, ["div", "p"])
    return Response.success(el1);

}