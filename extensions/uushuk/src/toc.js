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
    if (url.slice(-1) === "/") url = url.slice(0, -1);

    if (url.indexOf("action=loadChapterPage") >= 0) {
        var idMatch = url.match(/[?&]id=([^&]+)/);
        var pageMatch = url.match(/[?&]page=([^&]+)/);
        var aid = idMatch && idMatch.length > 1 ? decodeURIComponent(idMatch[1]) : "";
        var page = pageMatch && pageMatch.length > 1 ? decodeURIComponent(pageMatch[1]) : "1";
        if (!aid) return Response.error("Missing article id");

        var apiRes = fetch(BASE_URL + "/index.php?action=loadChapterPage", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" },
            body: "id=" + encodeURIComponent(aid) + "&page=" + encodeURIComponent(page)
        });
        if (!apiRes.ok) return Response.error("Cannot load TOC API: " + apiRes.status);

        var json = apiRes.json();
        if (!json || json.code !== 0 || !json.data) return Response.error("Invalid TOC API response");

        var apiChapters = [];
        json.data.forEach(function(item) {
            var name = (item.chaptername || "") + "";
            var chapUrl = absUrl(item.chapterurl || "");
            if (name && chapUrl) {
                apiChapters.push({
                    name: name,
                    url: chapUrl,
                    host: BASE_URL
                });
            }
        });

        if (apiChapters.length === 0) return Response.error("No chapters found");
        return Response.success(apiChapters);
    }

    var res = fetch(url);
    if (!res.ok) return Response.error("Cannot load: " + res.status);

    var doc = res.html();
    var chapters = [];
    var seen = {};

    doc.select(".chapter_list a").forEach(function(el) {
        var name = el.text().trim();
        var chapUrl = absUrl(el.attr("href"));
        if (!name || !chapUrl || seen[chapUrl]) return;
        seen[chapUrl] = true;

        chapters.push({
            name: name,
            url: chapUrl,
            host: BASE_URL
        });
    });

    if (chapters.length === 0) return Response.error("No chapters found");
    return Response.success(chapters);
}
