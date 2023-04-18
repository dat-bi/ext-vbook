function execute(url) {

    let response = fetch(url);
    if (response.ok) {
        var doc = response.html()
        let data = [];
        doc.select("body > div.container > div.content_view_chap img").forEach(e => {
            let img = e.attr("data-original");
            data.push(img);
        });
        return Response.success(data);
    }
    return null;
}