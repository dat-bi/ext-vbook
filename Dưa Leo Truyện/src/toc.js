load('config.js');
function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let list = [];
        doc.select(".box_list .chapter-item").forEach(e => list.push({
            name: e.text(),
            url: e.select("a").attr("href"),
            host: BASE_URL
        }));
        return Response.success(list.reverse());
    }
    return null;
}