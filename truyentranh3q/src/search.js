load('config.js');
function execute(key, page) {
    if (!page) page = '1';
    const doc = Http.get(BASE_URL + "/tim-kiem-nang-cao?keyword=" + key + "&page=" + page).html();

    var next = parseInt(page) + 1

    const el = doc.select("ul.list_grid li")

    const data = [];
    for (var i = 0; i < el.size(); i++) {
        var e = el.get(i);
        var coverImg = e.select("img").first().attr("src")
        data.push({
            name: e.select(".book_name a").first().text(),
            link: e.select(".book_name a").first().attr("href"),
            cover: BASE_URL + coverImg,
            description: e.select(".last_chapter").first().text(),
            host: BASE_URL
        })
    }

    return Response.success(data, next)
}