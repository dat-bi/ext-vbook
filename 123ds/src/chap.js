function execute(url) {
    let data  ="";
    let bookName0 = url.split('///')[1]
    url = url.split('///')[0]
    var arl = url.replace('https://www.123duw.com','').replace('https://m.123duw.com','');
    let browser = Engine.newBrowser();
    var doc = browser.launch(url, 4000)
    let bookName = doc.select("#DivContentBG h1").text()
    if(bookName === bookName0){
        var bookid = arl.replace('.html','')
    } else {
        arl = arl.replace(/\/\d+\.html/g,'')
        var brl = arl +'/'+ doc.select("#DivContentBG > ul > li:nth-child(1) > a").attr("href").replace('.html','')
        var bookid = brl
        var doc = browser.launch('https://www.123duw.com' + bookid + '.html', 4000)
    }
        let el = doc.select("#DivContentBG > div:nth-child(9) p").html();
        var next = doc.select("#PageSet > a:nth-last-child(2)").text();
        console.log(next)
        data += el;
        var part = 2; 
        while(part <= next){
            var doc = browser.launch('https://www.123duw.com' + bookid + '-' + part + '.html', 1500);
            let htm = doc.select("#DivContentBG > div:nth-child(9) p").html();
            data += htm;
            part++
        }
        browser.close()
        if(data === null){
            return Response.success('reload lại nếu không tải được chương');
        }
    return Response.success(data.replace('本章未完，请点击下一页继续阅读！','').replace('*,转载请注明处：123duw.com 。','').replace('老鹰吃小鸡提醒你：看后求收藏123读书网，接着再看好方便。',''));
}