function execute(url, page) {
    let response = fetch("https://www.downbook.cc/" + url);
    if (response.ok) {
        let doc = response.html("gbk");
        const data = [];
        var next = doc.select(".active a").first().attr("href")
		doc.select("#page > div.listd > ul li").forEach(e => {
            data.push({
                name: e.select("a:nth-child(2)").first().text(),
                link: e.select("a:nth-child(2)").first().attr("href"),
                description: e.select("a:nth-child(1)").first().text(),
                host: "https://www.downbook.cc"
            })
        });


        return Response.success(data, next);
    }
    return null;
}