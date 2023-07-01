load('config.js');
function execute(url) {
    url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL)
    var browser = Engine.newBrowser() // Khởi tạo browser
    let doc = browser.launch(url, 3000) // Mở trang web với timeout, trả về Document object
    browser.close() // Đóng browser khi đã xử lý xong
    doc.select(".aligncenter").remove()
    var el = doc.select("#content-d").first().select("img");
    var data = [];
    for (var i = 0; i < el.size(); i++) {
        var e = el.get(i);
        data.push(e.attr("src"));   
    }
    return Response.success(data);
}