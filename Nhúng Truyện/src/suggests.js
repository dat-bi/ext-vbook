function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let el = doc.select(".grid.grid-cols-1.gap-4 >div ")
        let data = [];
        el.forEach(e => data.push({
            name: e.select(".flex-shrink-0 img").attr("alt"),
            link: e.select(".flex-shrink-0 a").attr("href"),
            cover: e.select(".flex-shrink-0 img").attr("src"),
            description: e.select(".grow.space-y-2 div>span.text-xs").text(),
            host: "https://nhungtruyen.com"
        }))
        return Response.success(data)
    }
    return null;
}