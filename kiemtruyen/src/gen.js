function execute(url, page) {
    if (!page) page = '1';

    var doc = Http.get(url + "?page=" + page).html();

    if (doc) {
        var el = doc.select("#pagewrap > div.row.main-container > div.main-section > section > div.list-stories > ul > li");
        var novelList = [];
        var next = doc.select(".pagination > li.active + li").last().text();
        for (var i = 0; i < el.size(); i++) {
            var e = el.get(i);
            novelList.push({
                name: e.select(".title > a").text(),
                link: "https://kiemtruyen.com" + e.select(".title > a").first().attr("href"),
                description: e.select(".author").text(),
                cover:"https://kiemtruyen.com" + e.select("img").attr("src"),
                host: "https://kiemtruyen.com",
            });

        }
        return Response.success(novelList, next);
    }
    return null;
}