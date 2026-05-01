load("config.js");

// search.js — Tìm kiếm truyện
// Contract: execute(key, page) → [{ name*, link*, cover?, description?, host? }], nextPage?
function execute(key, page) {
    if (!page) page = "1";

    key = (key || "") + "";
    var url = BASE_URL + "/browse?q=" + encodeURIComponent(key) + "&page=" + page;

    // Use Browser to get hydrated DOM
    var b = Engine.newBrowser();
    var doc = null;
    try {
        b.setUserAgent(UserAgent.chrome());
        b.launchAsync(url);
        var i;
        for (i = 0; i < 10; i++) {
            sleep(700);
            doc = b.html(2000);
            if (doc && doc.select('a[href*="/watch/"]').size() > 0) break;
        }
        if (!doc) doc = b.html(2000);
    } finally {
        b.close();
    }

    var data = [];
    var seen = {};
    doc.select('a[href*="/watch/"]').forEach(function (a) {
        var href = (a.attr("href") || "") + "";
        if (!href || seen[href]) return;
        seen[href] = true;

        var name = (a.attr("title") || a.text() || "") + "";
        name = name.replace(/\s+/g, " ").trim();

        var imgEl = a.select("img").first();
        var cover = imgEl ? ((imgEl.attr("src") || imgEl.attr("data-src") || "") + "") : "";
        if (cover && cover.indexOf("http") !== 0) {
            cover = cover.indexOf("/") === 0 ? (BASE_URL + cover) : (BASE_URL + "/" + cover);
        }

        var link = href.indexOf("http") === 0 ? href : (href.indexOf("/") === 0 ? (BASE_URL + href) : (BASE_URL + "/" + href));
        link = encodeURI(link);
        if (data.length < 60) {
            data.push({ name: name || link, link: link, cover: cover, description: "", host: BASE_URL });
        }
    });

    var nextPage = null;
    if (data.length >= 20 && parseInt(page) < 50) nextPage = String(parseInt(page) + 1);
    return Response.success(data, nextPage);
}
