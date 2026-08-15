load('config.js');

function execute(url) {
    url = normalizeUrl(url);
    if (url.slice(-1) !== "/") url = url + "/";
    console.log(url);
    var response = fetch(url);
    if (!response.ok) return Response.error("Khong the tai thong tin truyen (HTTP " + response.status + ")");

    var doc = response.html();
    var genres = [];
    var tags = doc.select(".story-chips a");
    for (var i = 0; i < tags.size(); i++) {
        var tag = tags.get(i);
        genres.push({ title: tag.text() + "", input: normalizeUrl(tag.attr("href") + ""), script: "gen.js" });
    }
    var author = doc.select(".story-chips--tac-gia a").first();
    var authorName = author.text() + "";
    var authorUrl = author.attr("href") + "";
    var suggests = [];
    if (authorUrl) suggests.push({ title: "Truyen cung tac gia", input: normalizeUrl(authorUrl), script: "gen.js" });

    return Response.success({
        name: doc.select("h1.entry-title").text() + "",
        cover: "https://i.imgur.com/5BdXa90.png",
        author: authorName,
        description: doc.select(".entry-content p").first().text() + "",
        genres: genres,
        suggests: suggests,
        host: BASE_URL,
        ongoing: true
    });
}
