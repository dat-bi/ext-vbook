function execute(url, page) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        const data = [];
		let ele1 = doc.select(".result-item-layout")
        ele1.forEach(e => {
        let coverImg  = e.select(".list-card-header .card-bookInfo-cover").first().attr("cover");
            data.push({
                name: e.select(".book-name").first().text(),
                link: e.select(".book-name").first().attr("href"),
                cover: coverImg,
                description: e.select(".book-info p").get(1).text(),
                host: "http://www.yousuu.com"
            })
        });
        return Response.success(data)
    }
    return null;
}