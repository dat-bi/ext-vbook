load('config.js');
function execute(url, page) {
    if (!page) page = '1';
    let response = fetch(BASE_URL + url + "trang-" + page);
    if (response.ok) {
        let doc = response.html();
        var el = doc.select(".list-truyen div[itemscope]");
        console.log(el.size());
        
        var novelList = [];
        var next = doc.select(".pagination > li.active + li").last().text();
        for (var i = 0; i < el.size(); i++) {
            var e = el.get(i);
            novelList.push({
                name: e.select(".truyen-title > a").text(),
                link: e.select(".truyen-title > a").first().attr("href"),
                description: e.select(".author").text(),
                cover: e.select("img").attr("src")
            });

        }
        return Response.success(novelList, next);
    }
    return null;
}