function execute(key, page) {
    if (!page) page = '1';
    var response = fetch("https://truyenaudiocvv.com/danh-sach?page=" + page + "&keyword=" + key );
    if (response.ok) {
        let doc = response.html()
        var el = doc.select(".filter-content > ul li");
        var novelList = [];
        var next = doc.select(".pagination > li.active + li").last().text();
        for (var i = 0; i < el.size(); i++) {
            var e = el.get(i);
            novelList.push({
                name: e.select(".thumb img").attr("alt"),
                link: e.select(".thumb").attr("href"),
                description: e.select(".time").text(),
                cover:e.select(".thumb img").attr("src")
            });
        }
        return Response.success(novelList, next);
    }
    return Response.error("Ấn vào trang nguồn để check verify")
}