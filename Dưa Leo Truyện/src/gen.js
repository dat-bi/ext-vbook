load('config.js');
function execute(url, page) {
    if (!page) {page = 1;}
    let response = fetch(BASE_URL + url + "?page=" + page);
    if (response.ok) {
        let doc = response.html();
        var next = doc.select(".page_redirect .active + a").text();
        let data = [];
        doc.select(" .box_list .li_truyen").forEach(e => {
            data.push({
                name: e.select(".name").first().text(),
                link: e.select("a").first().attr("href"),
                cover: e.select(".img img").first().attr("data-src"),
                host: BASE_URL
            });
        });
        return Response.success(data, next);
    }
    return null;
}