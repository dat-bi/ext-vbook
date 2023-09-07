function execute(url, page) {
    if (!page) page = '1';
    let url1 = "https://truyenfull.com" + url + "trang-" + page + "/"
    console.log(url1)
    var response = fetch(url1);
    if (response.ok) {
        let doc = response.html()
        var el = doc.select(".list-truyen div[itemscope]");
        var novelList = [];

        var next = doc.select(".pagination > li.active + li").last().text();
        console.log(next)
        for (var i = 0; i < el.size(); i++) {
            var e = el.get(i);
            novelList.push({
                name: e.select(".truyen-title > a").text(),
                link: e.select(".truyen-title > a").first().attr("href"),
                description: e.select(".author").first().text(),
                cover: e.select(".col-xs-3.col-sm-2.col-md-3.col-list-image > div > img").attr("src"),
                host: "https://truyenfull.com",
            });
        }
        return Response.success(novelList, next);
    }
    return null;
}