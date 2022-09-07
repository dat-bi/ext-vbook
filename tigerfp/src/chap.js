function execute(url) {
    var url = url.replace('m.','www.')
    let el1 =""
    var browser = Engine.newBrowser() // Khởi tạo browser
    let doc = browser.launch(url, 5000) // Mở trang web với timeout, trả về Document object
    el1 = doc.select(".txt")
    browser.close()
    el1 = el1.html().replace(/\n/g,'')
            .replace(/&(nbsp|amp|quot|lt|gt);/g, "").replace(/<a(.*?)>(.*?)<\/a>/g,"")
            .replace(/(<br\s*\/?>){2,}/g, '<br>'); 
            console.log(el1)
        return Response.success(el1);

}