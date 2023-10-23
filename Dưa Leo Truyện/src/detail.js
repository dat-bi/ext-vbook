load('config.js');
function execute(url) {
    var browser = Engine.newBrowser() // Khởi tạo browser
    let doc = browser.launch(url, 7000) // Mở trang web với timeout, trả về Document object
    browser.close() // Đóng browser khi đã xử lý xong
    let coverImg = doc.select(".overflow-hidden.m-auto.d-none.d-md-block > img").first().attr("src");
    return Response.success({
        name: doc.select("#kt_app_content_container > div > div > div > div > div:nth-child(2) > div.col-lg-9.col-sm-8.mt-5.mt-lg-0 > h3").first().text(),
        cover: coverImg,
        author: null,
        description: doc.select("#description").html()
    });
}