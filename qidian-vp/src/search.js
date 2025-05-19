function execute(key, page) {
    var key = encodeURIComponent(key)
    let response = fetch("https://qidian-vp.com/tim-kiem?term=" + key)
    if (response) {
        let doc = response.html()
        var el = doc.select(".content-start article a" );
        var data = [];

        var next = doc.select(".ant-pagination-item-active + li a").last().attr("href");
        for (var i = 0; i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select("h3").text(),
                link: e.attr("href"),
                description: e.select("h4").first().text(),
                cover: e.select("img").attr("src"),
            });
        }
        return Response.success(data,next );
    }
    return null;
}
