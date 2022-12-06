function execute(url, page) {
    let response = fetch("https://www.qubook.cc/" + url);
    if (response.ok) {
        let doc = response.html("gbk");
        const data = [];
        var next = doc.select("dfn a").first().attr("href")
		doc.select("#page > div > div.ll > div.ll1 > ul li").forEach(e => {
            data.push({
                name: e.select("h1 a").first().text(),
                link: e.select("h1 a").first().attr("href"),
                description: e.select("h3").first().text(),
                host: "https://sj.qubook.cc/"
            })
        });


        return Response.success(data, next);
    }
    return null;
}