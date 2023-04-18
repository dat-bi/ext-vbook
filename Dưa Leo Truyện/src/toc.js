function execute(url) {
    var browser = Engine.newBrowser() // Khởi tạo browser
    let doc = browser.launch(url, 7000) // Mở trang web với timeout, trả về Document object
    browser.close() // Đóng browser khi đã xử lý xong
        let list = [];
        doc.select(".chap_name a").forEach(e => list.push({
                name: e.text(),
                url: e.attr("href"),
                host: "https://dualeotruyenhot.com"
        }));
        return Response.success(list.reverse());
}