function execute(url, page) {
    if (!page) page = '1';
    let response = fetch('https://nhungtruyen.com'+url +page);
    if(response.ok){
        let doc = response.html();
        let next = page + 1
        let el = doc.select("#filter-result .flex-shrink-0 a")
        let data = [];
        el.forEach(e => data.push({
            name: e.select("img").attr("alt"),
            link: e.select("a").attr("href"),
            cover: e.select("img").attr("src"),
            description: null,
            host: "https://nhungtruyen.com"
        }))
        return Response.success(data, next)
    }
    return null;
}