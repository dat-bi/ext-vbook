load('config.js');
function execute(url, page) {
    if (!page) page = '1';
    let lUrl = BASE_URL + url  + "?page="  +page
    let response = fetch(lUrl);
    let doc = response.html();
    if (!response.ok || doc == null) {
        return null;
    }
    var next = doc.select(".current+a").text();

    const el = doc.select(".page-item-detail")
    const data = [];
    for (var i = 0; i < el.size(); i++) {
        var e = el.get(i);
        var coverImg = e.select("img").first().attr("src")
        data.push({
            name: e.select(".h5 a").first().text(),
            link: e.select(".h5 a").first().attr("href"),
            cover: coverImg,
            description: e.select(".chapter-item .chapter  a").first().attr("href") ,
            host: BASE_URL
        })
    }

    return Response.success(data, next)
}