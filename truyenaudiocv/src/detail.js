function execute(url) {
    let response = fetch(url)
    if (response.ok) {
    let doc =response.html()
        return Response.success({
            name: doc.select(".title").text(),
            cover:doc.select(".col-lg-pull-6.col-lg-3 > div > img").attr("src"),
            host: "https://truyenaudiocvv.com",
            author: doc.select(".item-value span").first().text(),
            description: doc.select(".brief").text()
        });
    }
    return null;
}