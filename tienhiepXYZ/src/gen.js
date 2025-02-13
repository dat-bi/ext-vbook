function execute(url, page) {
    if (!page) page = "1";
    // let response = fetch("https://tienhiep.xyz/" + url + "?page=" + page);
    let response = fetch("https://tienhiep.xyz" + url + "?page=" + page);
    if (response.ok) {
        let doc = response.html();
        var el = doc.select(".grid.grid-cols-12.border-b.border-dashed");
        var novelList = [];
        var next = parseInt(page) + 1;
        for (var i = 0; i < el.size(); i++) {
            var e = el.get(i);
            novelList.push({
                name: e.select("h3").text(),
                link: e.select("h3 a").attr("href"),
                description: e.select('a[itemprop="author"]').text(),
                cover: e.select("img").attr("data-src"),
                host: "https://tienhiep.xyz/",
            });

        }
        return Response.success(novelList, next);
    }
    return null;
}