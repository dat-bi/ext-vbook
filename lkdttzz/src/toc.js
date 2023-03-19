function execute(url) {
    let response = fetch(url)
    if (response.ok) {
        var doc = response.html()
        let el = doc.select("#app > main > div.container > div > div:nth-child(3) > div:nth-child(1) > div.card-body > ul a");
        const data = [];
        for (let i = 0; i < el.size() ; i++) {
            let e = el.get(i);
            data.push({
                name: e.select(".chapter-name").text(),
                url: e.attr("href")
            })
        }
        return Response.success(data.reverse());
    }
    return null;
}