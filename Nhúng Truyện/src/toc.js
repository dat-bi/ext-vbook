function execute(url) {
    let kay = "";
    if (url.includes("vbook")) {
        kay = url.match(/\?vbook\d+/g)[0];
        url = url.replace(new RegExp(kay.replace(/\?/, "\\?"), "g"), "");
    }
    var urls = url;
    var newUrl, chapurl, sourceId;
    const data = [];
    if (url.slice(-1) !== "/") {
        url = url + "/";
    }
    let a = url.split("/")
    if (a.length == 7) {
        sourceId = a[4];
        urls = urls.replace(new RegExp("/" + sourceId + ".*?$", "g"), "")
    } else {
        var browser = Engine.newBrowser() // Khởi tạo browser
        browser.launch(url, 5000) // Mở trang web với timeout, trả về Document object
        let ul = browser.urls() // Trả về các url đã request trên trang
        browser.close() // Đóng browser khi đã xử lý xong
        chapurl = ul.match(/"https:\/\/cp.nhungtruyen.com\/api\/books\/\d+\/newest-chapters/g)[0].replace(/\"/g, "");
        var response = fetch(chapurl)
        let json = response.json()
        sourceId = json._data[0].id
    }
    newUrl = "https://cp.nhungtruyen.com/api/chapters?source_id=" + sourceId
    var response = fetch(newUrl)
    if (response.ok) {
        let json = response.json()
        let chap = json._data
        for (let key in chap) {
            data.push({
                name: chap[key].name || `Chương ${key}:`,
                url: urls + "/" + chap[key].source_id + "/" + key + kay,
                host: "https://nhungtruyen.com"
            })
        }
        return Response.success(data);
    }
    return null

}