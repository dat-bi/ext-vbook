function execute(url) {
    var doc = Http.get(url).html();

    if (doc){
        var list_chapter = [];
        var title = doc.select(".info-title").text()
        var el = doc.select("tbody td a");
        for (var i = el.size()-1 ; i >= 0 ; i--) {
            var e = el.get(i);
            list_chapter.push({
                //name: e.select("span")[0].text().replace('[...] – ',''),
                name: title + " - " + e.select("span").first().text().match(/Chap.+/)[0],
                url: e.attr("href"),
                host: "https://vcomycs.net"
            });
        }
    }
    return Response.success(list_chapter);
}