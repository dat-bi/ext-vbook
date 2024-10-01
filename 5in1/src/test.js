function execute(url) {
    url = url.replace("\.htm", '/')
    console.log(url)
    let response = fetch(url);
    let doc = response.html()
    // var data = [];
    console.log(doc)
    // var elems = doc.select('div.catalog > ul > li > a:not(#bookcase)');
    // elems.forEach(function (e) {
    //     data.push({
    //         name: formatName(e.text()),
    //         url: e.attr('href'),
    //         host: host69
    //     })
    // });
    // return Response.success(data.reverse());
}
    // let response = fetch(url);
    // let doc = response.html();
    // console.log(doc.select("body > script:nth-child(3)"))
    // url = "http://14.225.254.182/truyen/qidian/1/1040216164/" 
    // console.log(url)
    // var browser = Engine.newBrowser() // Khởi tạo browser
    // let doc = browser.launch(url, 5000) // Mở trang web với timeout, trả về Document object
    // browser.close() // Đóng browser khi đã xử lý xong
    // let text = doc.html()
    // console.log(text)
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
// }


