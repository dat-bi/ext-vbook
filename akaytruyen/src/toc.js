function execute(url) {
    let response = fetch(url);
        let doc = response.html();
        var el = doc.select("li.mt-2");
        const data = [];
        for (let i = 0; i < el.size(); i++) {
            let e = el.get(i);
            data.push({
                name: e.select(".chapter-title").text(),
                url: e.select("a").attr("href")
            });
        }
        return Response.success(data.reverse());
}