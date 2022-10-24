function execute(url) {
    let data  ="";
    bookid = url.replace('.html','').replace('https://www.123ds.org','').replace('https://m.123ds.org','');
    var part = 1;
        var url1 = 'https://www.123ds.org' + bookid + '-' + part + '.html';
        var browser = Engine.newBrowser() // Khởi tạo browser
        let doc = browser.launch(url1, 1500) // Mở trang web với timeout, trả về Document object
        let el = doc.select("#DivContentBG > div:nth-child(9) p").html()
        data += el;
        var next = doc.select("#PageSet > a:nth-last-child(2)").text();
    for(var part = 2; next >= part; part++){
            
            var doc = browser.launch('https://www.123ds.org' + bookid + '-' + part + '.html', 1500);
            
            let htm = doc.select("#DivContentBG > div:nth-child(9) p").html();
            data += htm;
        }
        browser.close()
        if(data === null){
            return Response.success('reload lại nếu không tải được chương');
        }
    return Response.success(data);
}