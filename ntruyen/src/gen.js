function execute(url, page) {
    if (!page) page = '1';
    let response = fetch('https://ntruyen.vn/'+url,{
        method : "GET",
        queries : {
            paged : page
        }
    });
    if(response.ok){
        let doc = response.html();
        let next = doc.select(".pagination").select("li.active + li").text()
        let el = doc.select(".grid-story-item")
        let data = [];
        el.forEach(e => data.push({
            name: e.select("h3 a").first().text(),
            link: e.select("h3 a").first().attr("href"),
            cover: e.select(".cover img").first().attr("src"),
            description: e.select(".metas a").first().text() + " - " + e.select(".metas a").last().text() + " - " + e.select(".metas span").last().text(),
            host: "https://ntruyen.vn"
        }))
        return Response.success(data, next)
    }
    return null;
}