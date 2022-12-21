function execute(url) {
    var browser = Engine.newBrowser() // Khởi tạo browser
    browser.launch(url, 3000) // Mở trang web với timeout, trả về Document object
    let ul = browser.urls() // Trả về các url đã request trên trang
    let newUrl = ul.match(/"https:\/\/cp.nhungtruyen.com\/api\/chapters\?source_id\\u003d\d+/g)[0].replace(/\"/g,"").replace("\\u003d","=")
    browser.close() // Đóng browser khi đã xử lý xong
    console.log(newUrl)
    var response = fetch(newUrl)
    if(response.ok){
        let json = response.json()
        let chap = json._data
        console.log(chap[1])
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