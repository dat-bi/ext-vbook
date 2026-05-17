load('config.js');

function execute() {
    var res = fetch(BASE_URL + "/", { headers: { "User-Agent": UserAgent.chrome() } });
    if (!res.ok) return Response.error("Cannot load: " + res.status);

    var doc = res.html();
    var data = [];
    var seen = {};

    doc.select(".hot_search a[href^=search]").forEach(function (el) {
        var title = el.text().replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();
        var href = (el.attr("href") || "") + "";
        if (!title || !href || seen[href]) return;
        seen[href] = true;
        href = absoluteUrl(href);
        data.push({
            title: upperEachWord(translateVp(title).trim()),
            input: href,
            script: "gen.js"
        });
    });

    return Response.success(data);
}
