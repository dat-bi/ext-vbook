function execute(url) {
    var browser = Engine.newBrowser() // Khởi tạo browser
    let doc = browser.launch(url, 7000) // Mở trang web với timeout, trả về Document object
    browser.close() // Đóng browser khi đã xử lý xong
    let coverImg = doc.select(".box_info_left > div.img > img").first().attr("src");
    return Response.success({
        name: doc.select(".box_info.break > div.box_info_right h1").first().text(),
        cover: coverImg,
        author: null,
        description: doc.select("body > div.container > div > div.box_info.break > div.box_info_right > ul.list-tag-story.list-orange").html(),
        detail: doc.select("body > div.container > div > div.box_info.break > div.box_info_right > div.txt > p:nth-child(1)").html(),
        host: "https://dualeotruyenhot.com/",
        ongoing: doc.select("body > div.container > div > div.box_info.break > div.box_info_right > div.txt > p:nth-child(2)").html().indexOf("Đang cập nhật") >= 0
    });
}