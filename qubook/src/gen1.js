function execute(url, page) {
    let response = fetch("https://www.qubook.cc/" + url);
    if (response.ok) {
        let doc = response.html("gbk");
        const data = [];
        var next = doc.select(".active+ a").first().attr("href")
		doc.select("#page > div.sear li").forEach(e => {
            data.push({
                name: e.select(" h1 > a:nth-child(2) > font").first().text(),
                link: e.select("h1 > a:nth-child(2)").first().attr("href"),
                description: e.select(" h1 > a:nth-child(1)").first().text(),
                host: "https://www.qubook.cc/"
            })
        });
        return Response.success(data, next);
    }
    return null;
}