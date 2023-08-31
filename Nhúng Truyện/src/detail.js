function execute(url) {
    var newUrl, chapurl;
    url = url.replace(/\?vbook\d+/g, "");
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
        newUrl = "https://cp.nhungtruyen.com/api/chapters/0?enable_fanfic=0&source_id=" + json._data[0].id + "&index=1&refresh=0";
    }
    var response = fetch(newUrl)
    if (response.ok) {
        let json = response.json();
        var bookinfo = json._data.book;
        return Response.success({
            name: bookinfo.title,
            cover: "https://media.nhungtruyen.com/thumb/" + bookinfo.poster,
            author: bookinfo.author_name,
            description: bookinfo.synopsis,
            suggests: [
                {
                    title: "Truyện cùng tác giả",
                    input: "https://nhungtruyen.com/tac-gia/" + slugify(bookinfo.author_name),
                    script: "suggests.js"
                }
            ],
        });
    }
    return null
}
function slugify(e){var a="àáäâãåăæąçćčđďèéěėëêęğǵḧìíïîįłḿǹńňñòóöôœøṕŕřßşśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;",r=new RegExp(a.split("").join("|"),"g");return e.toString().toLowerCase().replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi,"a").replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi,"e").replace(/i|í|ì|ỉ|ĩ|ị/gi,"i").replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi,"o").replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi,"u").replace(/ý|ỳ|ỷ|ỹ|ỵ/gi,"y").replace(/đ/gi,"d").replace(/\s+/g,"-").replace(r,e=>"aaaaaaaaacccddeeeeeeegghiiiiilmnnnnooooooprrsssssttuuuuuuuuuwxyyzzz------".charAt(a.indexOf(e))).replace(/&/g,"-and-").replace(/[^\w\-]+/g,"").replace(/\-\-+/g,"-").replace(/^-+/,"").replace(/-+$/,"")}
