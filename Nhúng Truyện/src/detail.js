function execute(url) {
    var newUrl, chapurl;
    url = url.replace("?vbook", "");
    if (url.slice(-1) !== "/") {
        url = url + "/";
    }
    let arr = url.split("/")
    var browser = Engine.newBrowser() // Khởi tạo browser
    browser.launch(url, 5000) // Mở trang web với timeout, trả về Document object
    let ul = browser.urls() // Trả về các url đã request trên trang
    browser.close() // Đóng browser khi đã xử lý xong
    if (arr.length != 5) {
        newUrl = ul.match(/"https:\/\/cp.nhungtruyen.com\/api\/chapters\/\d+(.*?)\"/g)[0].replace(/\"/g, "").replace(/\\u003d/g, "=").replace(/\\u0026/g, "&");
    } else {
        chapurl = ul.match(/"https:\/\/cp.nhungtruyen.com\/api\/books\/\d+\/newest-chapters/g)[0].replace(/\"/g, "");
        var response = fetch(chapurl);
        let json = response.json();
        newUrl = "https://cp.nhungtruyen.com/api/chapters/" + json._data[0].newest_chapter.id + "?enable_fanfic=0&source_id=" + json._data[0].id + "&index=1";
    }
    var response = fetch(newUrl)
    if (response.ok) {
        let json = response.json();
        var bookinfo = json._data.book;
        return Response.success({
            name: bookinfo.title.vi + "-" + bookinfo.title.zh,
            cover: bookinfo.image,
            author: bookinfo.author_name.vi,
            description: bookinfo.synopsis.vi,
            suggests: [
                {
                    title: "Truyện cùng tác giả",
                    input: "https://nhungtruyen.com/tac-gia/" + bookinfo.author_name.ascii,
                    script: "suggests.js"
                }
            ],
        });
    }
    return null
}