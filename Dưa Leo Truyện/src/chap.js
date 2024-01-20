load('config.js');
function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    let response = fetch(url);
    if (response.ok) {
        var doc = response.html()
        let data = [];
        doc.select(".content-container img").forEach(e => {
            let img = e.attr("src");
            data.push(img);
        });
        return Response.success(data);
    }
    return null;
}