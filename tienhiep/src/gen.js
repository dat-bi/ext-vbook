function execute(url, page) {
    if (!page) page = '1';

    var doc = Http.get("https://tienhiep2.net" + url + "?page=" + page).html();

    if (doc) {
        var el = doc.select(".col-xs-12");
        var novelList = [];
        var next = doc.select(".pagination > li.active + li").last().text();
        for (var i = 0; i < el.size(); i++) {
            var e = el.get(i);
            novelList.push({
                name: e.select(".left-inner a img").attr("alt"),
                link: e.select(".left-inner a").attr("href"),
                description: e.select(".right-inner > div > div > ul").text(),
                cover: e.select(".left-inner a img").attr("src"),
                host: "https://tienhiep2.net",
            });

        }
        return Response.success(novelList, next);
    }
    return null;
}