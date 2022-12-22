load('config.js');
function execute(url) {
    let response = fetch(url)
    if (response.ok) {
    let doc =response.html()
        return Response.success({
            name: doc.select(".title").text(),
            cover:doc.select(".col-lg-pull-6.col-lg-3 > div > img").attr("src"),
            host: BASE_URL,
            author: doc.select(".item-value span").first().text(),
            description: doc.select(".brief").text()
        });
    }
    return Response.error("Ấn vào trang nguồn để check verify");
}