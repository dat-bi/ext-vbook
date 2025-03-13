function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        var el = doc.select(".story-item");
        const data = [];
        for (let i = 0; i < el.size(); i++) {
            let e = el.get(i);
            data.push({
                name: e.select("h3").text(),
                link: e.select("a").attr("href"),
                description: "Akay Hau",
                cover: e.select("img").attr("src")
            });
        }
        return Response.success(data);
    }
}