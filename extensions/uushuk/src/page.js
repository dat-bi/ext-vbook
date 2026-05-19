var BASE_URL = "https://www.uushuk.com";

function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    if (url.slice(-1) === "/") url = url.slice(0, -1);

    var res = fetch(url);
    if (!res.ok) return Response.error("Cannot load: " + res.status);

    var doc = res.html();
    var aid = doc.select(".page2").attr("data-aid") + "";
    if (!aid) {
        var html = doc.select("script").html() + "";
        var match = html.match(/articleid\s*=\s*"([^"]+)"/);
        if (match && match.length > 1) aid = match[1];
    }

    var pages = [url];
    var maxPage = 1;
    doc.select(".chapter_page option").forEach(function(el) {
        var value = parseInt((el.attr("value") || "0") + "");
        if (value > maxPage) maxPage = value;
    });

    if (aid && maxPage > 1) {
        for (var i = 2; i <= maxPage; i++) {
            pages.push(BASE_URL + "/index.php?action=loadChapterPage&id=" + encodeURIComponent(aid) + "&page=" + i);
        }
    }

    return Response.success(pages);
}
