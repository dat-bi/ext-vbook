function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let el = doc.select(".list-chapter li a");
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
    return null;
}