function execute(url) {
    let response = fetch(url);
        let doc = response.html();
        var el = doc.select("#list-chap li a");
        const data = [];
        for (let i = 0; i < el.size(); i++) {
            let e = el.get(i);
            data.push({
                name: e.text(),
                url: e.attr("href")
            });
        }
        return Response.success(data);
}