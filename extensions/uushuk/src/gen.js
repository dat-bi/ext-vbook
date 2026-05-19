var BASE_URL = "https://www.uushuk.com";

function absUrl(href) {
    href = (href || "") + "";
    if (!href) return "";
    if (href.indexOf("//") === 0) return "https:" + href;
    if (href.indexOf("http") === 0) return href;
    return href.indexOf("/") === 0 ? BASE_URL + href : BASE_URL + "/" + href;
}

function pageUrlOf(url, page) {
    if (url.indexOf("{{page}}") >= 0) return url.replace("{{page}}", page);
    if (parseInt(page) > 1 && /\/list-\d+\/?$/.test(url)) {
        return url.replace(/\/list-(\d+)\/?$/, "/list-$1-" + page + "/");
    }
    return url;
}

function execute(url, page) {
    if (!page) page = "1";
    var res = fetch(pageUrlOf(BASE_URL + url, page));
    if (!res.ok) return Response.error("Cannot load: " + res.status);

    var doc = res.html();
    var data = [];
    var seen = {};

    doc.select(".speList li, .rankList li").forEach(function(el) {
        var linkEl = el.select(".name a").first();
        if (!linkEl) return;

        var link = absUrl(linkEl.attr("href"));
        if (!link || seen[link]) return;
        seen[link] = true;

        var imgEl = el.select("img").first();
        var cover = imgEl ? absUrl(imgEl.attr("data-src") || imgEl.attr("src")) : "";

        data.push({
            name: linkEl.text().trim(),
            link: link,
            cover: cover,
            description: el.select(".intro").text().trim(),
            host: BASE_URL,
            tag: el.select(".hit").text().trim()
        });
    });

    var nextHref = doc.select(".page a.next").attr("href") + "";
    var hasNext = nextHref && nextHref.indexOf("javascript") < 0;
    return Response.success(data, hasNext ? String(parseInt(page) + 1) : null);
}
