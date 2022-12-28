function execute(url) {
    var newUrl, chapurl;
    let id = url.split("/")[4]
    if( id  === "undefined"){
        var browser = Engine.newBrowser() // Khởi tạo browser
        browser.launch(url, 3000) // Mở trang web với timeout, trả về Document object
        let ul = browser.urls() // Trả về các url đã request trên trang
        newUrl = ul.match(/"https:\/\/cp.nhungtruyen.com\/api\/chapters\?source_id\\u003d\d+/g)[0].replace(/\"/g,"").replace("\\u003d","=")
        browser.close() // Đóng browser khi đã xử lý xong
        // console.log(newUrl)
    } else {
        chapurl = "https://cp.nhungtruyen.com/api/chapters/"+id
        var response = fetch(chapurl)
        let json = response.json()
        let sourceId = json._data.source_id
        newUrl = "https://cp.nhungtruyen.com/api/chapters?source_id=" + sourceId
    }
        var response = fetch(newUrl)
        if(response.ok){
            let json = response.json()
            let chap = json._data
            let data = []
            for (let i = 0; i < chap.length; i++) {
                data.push({
                    name: chap[i].name.vi,
                    url: url + "/" + chap[i].id,
                    host: "https://nhungtruyen.com"
                })
            }
            return Response.success(data);
        }
        return null

}