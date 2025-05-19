function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        sleep(200)
        let doc = response.html();
        let el1 = doc.select("#chapter-list")
        let el = el1.select("a")
        const data = [];
        for (let i = 0;i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select("h3").text(),
                url: e.attr("href")
            })
        }
        return Response.success(data);
    }
    return null;
}