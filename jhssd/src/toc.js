function execute(url) {
    if(url.slice(-1) !== "/"){
        url = url + "/"
    }
        url = url.replace('www.','wap.').replace('https://wap.jhssd.com','')
    const data  = [];
    let part1 = url.replace("https://wap.jhssd.com", "").replace('.html','');
    var next = part1;
    console.log(next)
    while (next.includes(part1)) {
        var browser = Engine.newBrowser();
        browser.setUserAgent(UserAgent.android());
        browser.close()
        var doc = browser.launch("https://wap.jhssd.com" + next , 3000);
        // console.log(doc)
        next = doc.select(".listpage .right a").attr("href")
        if (doc) {
            next = doc.select(".listpage .right a").attr("href")
            console.log(next)
                var el = doc.select(".chapter").last().select("li")
                for (var i = 0; i < el.size(); i++) {
                    var e = el.get(i);
                    data.push({
                        name: e.select("a").text(),
                        url: "https://wap.jhssd.com" + e.select("a").attr("href"),
                        host: "https://wap.jhssd.com"
                    })
                }                
        } else {
            break;
        }
        
    }
    
        return Response.success(data);

}