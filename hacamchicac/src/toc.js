load('config.js');
function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    if (url.includes("-chap-")) {
        url = fetch(url).html().select(" pre a:nth-child(2)").attr("href")
    }
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        // console.log(doc)
        let list = [];
        doc.select(".pc-post-children ul li a").forEach(e => list.push({
            name: e.text(),
            url: e.attr("href"),
            host: BASE_URL
        }));
        return Response.success(list);
    }
    return null;
}