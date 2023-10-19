function execute(url) {
    url = decodeURIComponent(url)
    let response = fetch(url + "/");

    if (response.ok) {
        let doc = response.html();
        let data = [];
        doc.select("div.article-fulltext > p > img").forEach(e => {
            data.push(e.attr("src"));
        });

        return Response.success(data);
    }

    return null;
}