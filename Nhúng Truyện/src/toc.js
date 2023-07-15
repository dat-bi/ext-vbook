function execute(url) {
    var urls = url;
    var newUrl, chapurl, sourceId;
    const data = [];
    if (url.slice(-1) !== "/") {
        url = url + "/";
    }
    let a = url.split("/")
    // console.log(a.length)
    if (a.length == 7) {
        // chapurl = ul.match(/"https:\/\/cp.nhungtruyen.com\/api\/chapters\/\d+/g)[0].replace(/\"/g, "");
        // var response = fetch(chapurl)
        // let json = response.json()
        // sourceId = json._data.source_id
        // let id_chap = url.split("/")[4]
        // urls = urls.replace(new RegExp("/" + id_chap, "g"), "")
        sourceId = a[4];
        urls = urls.replace(new RegExp("/" + sourceId + ".*?$", "g"), "")
        // console.log(urls)
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
    // console.log(newUrl)
    var response = fetch(newUrl)
    if (response.ok) {
        let json = response.json()
        let chap = json._data
        for (let i = 0; i < chap.length; i++) {
            data.push({
                name: chap[i].name.vi||`Chương ${i+1}:`,
                url: urls + "/" + chap[i].id,
                host: "https://nhungtruyen.com"
            })
        }
        return Response.success(data);
    }
    return null

}