function execute(url) {
    var newUrl, chapurl, Id;
    if (url.slice(-1) !== "/") {
        url = url + "/";
    }
    let arr = url.split("/")
    var browser = Engine.newBrowser() // Khởi tạo browser
    browser.launch(url, 5000) // Mở trang web với timeout, trả về Document object
    let ul = browser.urls() // Trả về các url đã request trên trang
    browser.close() // Đóng browser khi đã xử lý xong
    if (arr.length != 5) {
        newUrl = ul.match(/"https:\/\/cp.nhungtruyen.com\/api\/chapters\/\d+/g)[0].replace(/\"/g, "");
    } else {
        chapurl = ul.match(/"https:\/\/cp.nhungtruyen.com\/api\/books\/\d+\/newest-chapters/g)[0].replace(/\"/g, "");
        var response = fetch(chapurl)
        let json = response.json()
        Id = json._data[0].newest_chapter.id
        newUrl = "https://cp.nhungtruyen.com/api/chapters/" +Id + "/"
        // console.log(newUrl)
    }
    
    var response = fetch(newUrl)
    if (response.ok) {
        let json = response.json();
        var bookinfo = json._data.book;
        let genres = [];
        bookinfo.tags.forEach(e => {
            genres.push({
                title: e.name.vi,
                input: e.pivot.tag_id,
                script: "gen1.js"
            });
        });
        return Response.success({
            name: bookinfo.title.vi + "-" + bookinfo.title.zh,
            cover: bookinfo.image,
            author: bookinfo.author_name.vi,
            description: bookinfo.synopsis.vi,
            genres: genres,
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