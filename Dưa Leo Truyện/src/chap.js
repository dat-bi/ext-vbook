load('config.js');
function execute(url) {

    let response = fetch(url);
    if (response.ok) {
        var doc = response.html()
        let data = [];
        doc.select(".content_view_chap > img").forEach(e => {
            let img = e.attr("src");
            data.push(img);
        });
        return Response.success(data);
    }
    return null;
}