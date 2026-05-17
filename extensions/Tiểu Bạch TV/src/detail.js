load('config.js');

function execute(url) {
    url = normalizeUrl(url);

    var res = fetch(url, { headers: { "User-Agent": UserAgent.chrome() } });
    if (!res.ok) return Response.error("Cannot load: " + res.status);

    var doc = res.html();

    var rawName = doc.select("meta[property=og:title]").attr("content") + "";
    if (!rawName) rawName = doc.select(".panel-heading .panel-title").text() + "";

    var cover = doc.select("video").attr("poster") + "";
    if (!cover) {
        var idMatch = url.match(/video-(\d+)\.htm/);
        if (idMatch) cover = "https://i.hdcdn.online/thumb/" + idMatch[1] + ".webp";
    }
    if (!cover) cover = doc.select("meta[property=og:image]").attr("content") + "";
    cover = absoluteUrl(cover);

    var author = doc.select("meta[property=og:video:actor]").attr("content") + "";
    if (!author) {
        var authorEl = doc.select(".panel-body a[href^=user.htm]").first();
        author = authorEl ? authorEl.text().trim() + "" : "";
    }

    var category = doc.select("meta[property=og:video:class]").attr("content") + "";
    var duration = doc.select("meta[property=video:duration]").attr("content") + "";
    var rawDescription = doc.select("meta[property=og:description]").attr("content") + "";
    if (duration) rawDescription = rawDescription + "<br>Thời lượng: " + duration;
    var name = formatName(rawName);
    var description = formatDescription(rawDescription);

    var genres = [];
    if (category) {
        genres.push({ title: category, input: BASE_URL + "/list-{{page}}.htm", script: "gen.js" });
    }

    return Response.success({
        name: name,
        cover: cover,
        host: BASE_URL,
        author: author,
        description: description,
        ongoing: false,
        format: "series",
        genres: genres,
        suggests: [{ title: "De cu video", input: url, script: "suggest.js" }]
    });
}
