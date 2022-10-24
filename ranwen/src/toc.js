function execute(url) {
    url = url.replace('m.ranwen.la','www.ranwen.la')
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let el1 = doc.select("#list").last()
        let el = el1.select("dd a")
        const data = [];
        for (let i = 15;i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select("a").text(),
                url: "https://www.ranwen.la" + e.attr("href"),
                host: "https://www.ranwen.la"
            })
        }
        return Response.success(data);
    }
    return null;
}