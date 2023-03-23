function execute(url) {
        var browser = Engine.newBrowser() // Khởi tạo browser
        browser.launch(url, 3000) // Mở trang web với timeout, trả về Document object
        let ul = browser.urls() // Trả về các url đã request trên trang
        console.log(ul)
        browser.close() // Đóng browser khi đã xử lý xong
    // return null

}