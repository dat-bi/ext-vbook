load('config.js');

function execute(url, page) {
    var newUrl = "";
    var nextUrl = String(page || "");
    if (/^https?:\/\//i.test(nextUrl)) {
        newUrl = normalizeUrl(nextUrl);
    } else {
        url = normalizeUrl(url);
        if (url.slice(-1) !== "/") url = url + "/";
        newUrl = url + (nextUrl ? "page/" + nextUrl + "/" : "");
    }
    console.log(newUrl);
    var response = fetch(newUrl);
    if (!response.ok) return Response.error("Khong the tai danh sach truyen (HTTP " + response.status + ")");

    var doc = response.html();
    var data = [];
    var cards = doc.select("article.post.story-card");
    for (var i = 0; i < cards.size(); i++) {
        var card = cards.get(i);
        var link = card.select("a.story-card__link").first();
        var href = link.attr("href") + "";
        var name = link.select("h2.entry-title").text() + "";
        if (!href || !name) continue;
        data.push({ name: name, link: normalizeUrl(href), cover: "https://i.postimg.cc/T2WtdmBM/5BdXa90.webp", host: BASE_URL });
    }
    return Response.success(data, doc.select("link[rel=next]").attr("href") + "");
}
