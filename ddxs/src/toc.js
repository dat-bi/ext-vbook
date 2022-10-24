function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let el = doc.select(".L a");
        const data = [];
        for (let i = 15; i< el.size(); i++) {
            let e = el.get(i);
            data.push({
            name: e.select("a").text(),
            url: "https://www.ddxs.com" + e.attr("href"),
            host: "https://www.ddxs.com"
        });
        }

        return Response.success(data);
    }
    return null;
}