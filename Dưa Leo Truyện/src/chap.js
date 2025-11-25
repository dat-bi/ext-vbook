load('config.js');
function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    let response = fetch(url);
    if (response.ok) {
        var doc = response.html()
        var data = [];
        var imgs = doc.select(".page-break img");

        for (var i = 0; i < imgs.size(); i++) {
            var e = imgs.get(i);

            var img = e.attr("data-src");
            if (img == null || img == "") {
                img = e.attr("src");
            }

            if (img.indexOf("/images/10031288211667576604.webp") > -1) continue;
            if (img != null && img != "") {
                data.push(img);
            }
        }
        return Response.success(data);
    }
    return null;
}