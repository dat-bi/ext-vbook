function execute(url, page) {
    if (!page) page = '1';
    let response = fetch(url + "?page=" + page);
    if (response.ok) {
        let doc = response.html();
        let next = page + 1
        let el = doc.select(".grid.grid-cols-1.gap-4 >div ")
        let data = [];
        el.forEach(e => data.push({
            name: e.select(".flex-shrink-0 img").attr("alt"),
            link: e.select(".flex-shrink-0 a").attr("href"),
            cover: e.select(".flex-shrink-0 img").attr("src"),
            description: e.select(".grow.space-y-2 > div.mt-1.space-y-1 span").get(0).text(),
            host: "https://nhungtruyen.com"
        }))
        return Response.success(data, next)
    }
    return null;
}