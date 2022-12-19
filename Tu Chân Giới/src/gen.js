function execute(url, page) {
    if (!page) page = '1';

    var doc = Http.get("https://tuchangioi.net" + url + "?page=" + page).html();

    if (doc) {
        var el = doc.select(".item-list");
        var novelList = [];
        var next = doc.select("li.active + li").last().text();
        for (var i = 0; i < el.size(); i++) {
            var e = el.get(i);
            novelList.push({
                name: e.select(".storyname").text(),
                link: e.select(".storyname a").attr("href"),
                description: null,
                cover: "https://i.pinimg.com/564x/f7/67/c4/f767c4ba03e6efa15642e4dadfc2b8a9.jpg",
                host: "https://tuchangioi.net",
            });

        }
        return Response.success(novelList, next);
    }
    return null;
}