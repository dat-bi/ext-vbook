load('config.js');

function buildPageUrl(url, page) {
    if (url.indexOf("{{page}}") !== -1) return url.replace("{{page}}", page);
    if (url.indexOf("/search") !== -1) {
        if (page === "1") return url;
        return url.replace(/\/search(?:-\d+)?\.htm/, "/search-" + page + ".htm");
    }
    return url;
}

function hasNextPage(doc, pageUrl, page) {
    var nextPageNum = String(parseInt(page, 10) + 1);
    if (pageUrl.indexOf("/search") !== -1) {
        var query = "";
        var queryIndex = pageUrl.indexOf("?");
        if (queryIndex !== -1) query = pageUrl.substring(queryIndex);
        var nextSearchPath = "search-" + nextPageNum + ".htm" + query;
        return doc.select(".pagination1 a[href='" + nextSearchPath + "']").size() > 0;
    }
    if (pageUrl.match(/(\d+)\.htm/)) {
        var nextHref = pageUrl.replace(/(\d+)\.htm(\?.*)?$/, nextPageNum + ".htm");
        var nextPath = nextHref.replace(BASE_URL + "/", "");
        return doc.select(".pagination1 a[href='" + nextPath + "']").size() > 0;
    }
    return false;
}

function execute(url, page) {
    if (!page) page = "1";
    url = normalizeUrl(url);
    var pageUrl = buildPageUrl(url, page);

    var res = fetch(pageUrl, { headers: { "User-Agent": UserAgent.chrome() } });
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

        var tag = el.select(".duration").text().trim();
        var name = formatName(linkEl.text().trim());
        var description = formatDescription(extractStats(el));
        data.push({
            name: name,
            link: link,
            cover: cover,
            description: description,
            host: BASE_URL,
            tag: tag
        });
    });

    var hasNext = hasNextPage(doc, pageUrl, page);
    var nextPage = hasNext ? String(parseInt(page) + 1) : null;

    return Response.success(data, nextPage);
}
