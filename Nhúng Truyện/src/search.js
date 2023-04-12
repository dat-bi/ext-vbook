function execute(key, page) { 
    var key = encodeURIComponent(key)
    let response = fetch("https://nhungtruyen.com/tim-kiem?keyword=" + key)
    if (response) {
        let doc = response.html();
        let el = doc.select("#filter-result > div > div.box-content > div > div")
        let data = [];
        el.forEach(e => data.push({
            name: e.select(".flex-shrink-0 img").attr("alt"),
            link: e.select(".flex-shrink-0 a").attr("href"),
            cover: e.select(".flex-shrink-0 img").attr("src"),
            description: e.select(".grow.space-y-2 > div.mt-1.space-y-1 span").get(0).text(),
            host: "https://nhungtruyen.com"
        }))
        return Response.success(data)
    }
    return null;
}
