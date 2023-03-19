function execute(url) {
    let response = fetch(url)
    if (response.ok) {
        var doc = response.html()
        let data = [];
        doc.select("#chapter-content img").forEach(e => {
            let img = e.attr("data-src");
            data.push(img);
        });
        return Response.success(data);
    }
    return null;
}