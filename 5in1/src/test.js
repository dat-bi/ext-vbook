function execute(url) {
    // let response = fetch(url);
    // let doc = response.html();
    // console.log(doc.select("body > script:nth-child(3)"))
    url = "https://fanqienovel.com/api/reader/full?itemId=" + "7350108490167241753"
    console.log(url)
    var browser = Engine.newBrowser() // Khởi tạo browser
    let doc = browser.launch(url, 5000) // Mở trang web với timeout, trả về Document object
    browser.callJs('document.cookie = "novel_web_id=7357767624615331362;";', 200)
    browser.close() // Đóng browser khi đã xử lý xong
    let text = doc.text()
    console.log(text)
    //     var author = doc.select("i.cap").attr("onclick").replace(/location=\'\/\?find\=&findinname\=(.*?)\'/g, "$1");
    //     let des = doc.select(".blk:has(.fa-water) .blk-body").html();
    //     let _detail = doc.select("#inner > div.container.px-md-4.px-sm-0.px-0 > div:nth-child(5) .blk-body");
    //     _detail.select("a").remove();
    //     let suggests = [
    //         {
    //             title: "Truyện từ các nguồn khác:",
    //             input: doc.select("#book_name2").first().text(),
    //             script: "suggests.js"
    //         }
    //     ];
    //     let data = {
    //         name: doc.select("#oriname").text(),
    //         cover: doc.select('meta[property="og:image"]').first().attr("content"),
    //         author: author || 'Unknow',
    //         description: des,
    //         detail: _detail.html().replace(/\n/g, "<br>"),
    //         ongoing: true,
    //         host: "STVHOST",
    //         suggests: suggests,
    //     }
    //     return Response.success(data);
}


