function execute(key, page) {
    var gbkEncode = function(s) {
        load('gbk.js');
        return GBK.encode(s);
    }
    if (!page) page = '1';
    var response = fetch("https://qubook.cc/search.asp?word="+gbkEncode(key)+"&m=2&ChannelID=0&page="+page);
    if (response.ok) {
        let doc = response.html()
        var el = doc.select(".sear li");
        var novelList = [];
        var next = doc.select("active + a").last().text();
        for (var i = 0; i < el.size(); i++) {
            var e = el.get(i);
            novelList.push({
                name: e.select("h1 > a:nth-child(2)").text(),
                link: e.select("h1 > a:nth-child(2)").attr("href"),
                description: e.select("h1 > a:nth-child(1)").text(),
                host: "https://qubook.cc/",
                cover:"https://www.downbook.cc/book/UploadPic/2022-12/45khhg5mhu0.jpg"
            });
        }
        return Response.success(novelList, next);
    }
    return null
}