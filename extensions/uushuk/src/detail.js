var BASE_URL = "https://www.uushuk.com";

function absUrl(href) {
    href = (href || "") + "";
    if (!href) return "";
    if (href.indexOf("//") === 0) return "https:" + href;
    if (href.indexOf("http") === 0) return href;
    return href.indexOf("/") === 0 ? BASE_URL + href : BASE_URL + "/" + href;
}

function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);

    var res = fetch(url);
    if (!res.ok) return Response.error("Cannot load: " + res.status);

    var doc = res.html();
    var name = doc.select(".book .name h1").text().trim();
    var cover = absUrl(doc.select(".book .pic img").attr("data-src") || doc.select(".book .pic img").attr("src"));
    var authorEl = doc.select(".book .info dd a[href^=/author/]").first();
    var author = authorEl ? authorEl.text().trim() : "";
    var status = doc.select(".book .label span").first().text().trim();
    var description = doc.select(".chapBox .iBox .content").html() + "";
    var ongoing = status.indexOf("全本") < 0 && status.indexOf("完结") < 0 && status.indexOf("Completed") < 0;

    var genres = [];
    var genreSeen = {};
    doc.select(".book .label a[href^=/list-], .position a[href^=/list-]").forEach(function(el) {
        var title = el.text().trim();
        var href = absUrl(el.attr("href"));
        if (!title || !href || genreSeen[href]) return;
        genreSeen[href] = true;
        genres.push({ title: title, input: href, script: "gen.js" });
    });

    var suggests = [];
    if (authorEl && author) {
        suggests.push({
            title: "同作者: " + author,
            input: absUrl(authorEl.attr("href")),
            script: "gen.js"
        });
    }

    return Response.success({
        name: name,
        cover: cover,
        host: BASE_URL,
        author: author,
        description: description,
        ongoing: ongoing,
        genres: genres.length > 0 ? genres : undefined,
        suggests: suggests.length > 0 ? suggests : undefined
    });
}
