function execute(key, page) {
    var gbkEncode = function(s) {
        load('gbk.js');
        return GBK.encode(s);
    }
    if (!page) page = '1';
    var response = fetch("https://downbook.cc/search.asp?word="+gbkEncode(key)+"&m=2&ChannelID=0&page="+page);
    if (response.ok) {
        let doc = response.html()
        var el = doc.select(".sear li");
        var novelList = [];
        var next = doc.select("active + a").last().text();
        for (var i = 0; i < el.size(); i++) {
            var e = el.get(i);
            novelList.push({
                name: e.select("h1 > a").text(),
                link: e.select("h1 > a").attr("href"),
                description: e.select("h5 > a").text(),
                host: "https://downbook.cc/",
                cover:"https://www.downbook.cc/book/UploadPic/2022-12/45khhg5mhu0.jpg"
            });
        }
        return Response.success(novelList, next);
    }
    return null
}