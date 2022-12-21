function execute(key, page) { 
    var key = encodeURIComponent(key)
    let response = fetch("https://nhungtruyen.com/kho-sach?keyword=" + key)
    if (response) {
        let doc = response.html();
        let el = doc.select("#filter-result .flex-shrink-0 a")
        let data = [];
        el.forEach(e => data.push({
            name: e.select("img").attr("alt"),
            link: e.select("a").attr("href"),
            cover: e.select("img").attr("src"),
            description: null,
            host: "https://nhungtruyen.com"
        }))
        return Response.success(data)
    }
    return null;
}
