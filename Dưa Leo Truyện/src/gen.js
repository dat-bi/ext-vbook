load('config.js');
function execute(url, page) {
    if (!page) {page = 1;}
    let response = fetch(BASE_URL + url + "?page=" + page);
    if (response.ok) {
        let doc = response.html();
        var next = doc.select(".pagination li.active + li").text();
        let data = [];
        doc.select(" .product-grid .card").forEach(e => {
            data.push({
                name: e.select(".comics-item-title").first().text(),
                link: e.select(".card-body a").first().attr("href"),
                cover: e.select("img").first().attr("src"),
                host: BASE_URL
            });
        });
        return Response.success(data, next);
    }
    return null;
}