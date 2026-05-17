load('config.js');

function execute(url) {
    url = normalizeUrl(url);

    var res = fetch(url, { headers: { "User-Agent": UserAgent.chrome() } });
    if (!res.ok) return Response.error("Cannot load: " + res.status);

    var doc = res.html();
    var data = [];
    var seen = {};

    doc.select(".thumbnail").forEach(function (el) {
        var linkEl = el.select(".caption.title a").first();
        var imgEl = el.select(".image").first();
        if (!linkEl) return;

        var link = (linkEl.attr("href") || "") + "";
        if (!link || seen[link]) return;
        seen[link] = true;

        link = absoluteUrl(link);
        var cover = extractCover(imgEl);

        data.push({
            name: formatName(linkEl.text().trim()),
            link: link,
            cover: cover,
            description: formatDescription(extractStats(el)),
            host: BASE_URL,
            tag: el.select(".duration").text().trim()
        });
    });

    return Response.success(data);
}
