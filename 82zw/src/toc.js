function execute(url) {
    url = url.replace('m.','www.')
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html("gbk");
        let el = doc.select("#list > dl > dd");
        const data = [];
        for (let i = 12; i< el.size(); i++) {
            let e = el.get(i);
            data.push({
            name: e.select("a").text(),
            url: "https://www.82zw.com" + e.attr("href"),
            host: "https://www.82zw.com"
        });
        }

        return Response.success(data);
    }
    return null;
}