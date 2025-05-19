load('config.js')
function execute(url, page) {
    if (!page) page = '1';
    let url1 = url + "?page=" + page
    console.log(url1)
    var response = fetch(url1);
    if (response.ok) {
        let doc = response.html()
        var el = doc.select(".content-start article a" );
        var novelList = [];

        var next = doc.select(".ant-pagination-item-active + li").last().text();
        console.log(next)
        for (var i = 0; i < el.size(); i++) {
            var e = el.get(i);
            novelList.push({
                name: e.select("h3").text(),
                link: e.attr("href"),
                description: e.select("h4").first().text(),
                cover: e.select("img").attr("src"),
            });
        }
        return Response.success(novelList, next);
    }
    return null;
}