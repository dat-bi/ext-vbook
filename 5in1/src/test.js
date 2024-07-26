
// function execute(url) {
//     var data;
//     data = getDetailStv(url);
// }

// function getDetailStv(url) {
//     //     let response = fetch(url + '/');
//     //     let doc = response.html();
//     var browser = Engine.newBrowser() // Khởi tạo browser
//     let doc = browser.launch(url, 1000) // Mở trang web với timeout, trả về Document object
//     browser.close() // Đóng browser khi đã xử lý xong


//     var author = doc.select("i.cap").attr("onclick").replace(/location=\'\/\?find\=&findinname\=(.*?)\'/g, "$1");
//     let des = doc.select(".blk:has(.fa-water) .blk-body").html();
//     let _detail = doc.select("#inner > div.container.px-md-4.px-sm-0.px-0 > div:nth-child(5) .blk-body");
//     _detail.select("a").remove();
//     let cover = doc.select(".container:has(#book_name2) img");
//     console.log(cover)
//     let data = {
//         name: doc.select("#oriname").text(),
//         cover: "",
//         author: author || 'Unknow',
//         description: des,
//         detail: _detail.html().replace(/\n/g, "<br>"),
//         ongoing: true,
//         host: STVHOST
//     }
//     return data;
// }


