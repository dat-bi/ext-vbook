var BASE_URL = "https://www.uushuk.com";

function absUrl(href) {
    href = (href || "") + "";
    if (!href) return "";
    if (href.indexOf("//") === 0) return "https:" + href;
    if (href.indexOf("http") === 0) return href;
    return href.indexOf("/") === 0 ? BASE_URL + href : BASE_URL + "/" + href;
}

function pathPart(url) {
    url = (url || "") + "";
    url = url.replace(/^(?:https?:\/\/)?(?:www\.)?uushuk\.com/i, "");
    url = url.replace(/\?.*$/, "");
    url = url.replace(/\.html$/, "");
    return url;
}

function isSameChapterPage(nextUrl, basePart) {
    var nextPart = pathPart(nextUrl);
    return nextPart === basePart || nextPart.indexOf(basePart + "-") === 0;
}

function cleanContent(content) {
    content = content.replace(/&nbsp;/g, " ");
    content = content.replace(/^独家！[^<]+<p>/, "<p>");
    content = content.replace(/作者“[^<]+推荐阅读[^<]+下载安装。/g, "");
    content = content.replace(/全网热读《[^<]+尽在uu书库。/g, "");
    content = content.replace(/[a-z0-9][a-z0-9-]*\.(?:com|net|org|cn|cc|vip|xyz|info)/ig, "");
    content = content.replace(/(?:<p>\s*<\/p>\s*)+/g, "");
    content = content.replace(/\n{3,}/g, "\n");
    return content;
}

function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);

    var basePart = pathPart(url);
    var content = "";
    var seen = {};
    var count = 0;

    while (url && !seen[url] && count < 20) {
        seen[url] = true;
        count++;

        var res = fetch(url);
        if (!res.ok) return Response.error("Cannot load: " + res.status);

        var doc = res.html();
        doc.select("script, style, ins, iframe, .ads, .advertisement, .banner, .quangcao").remove();
        doc.select("[class*='ads'], [id*='ads'], .fb-comments, #fb-comments, .btnErrorW").remove();

        var contentEl = doc.select(".conC .content").first();
        if (!contentEl) return Response.error("No content found");

        content += contentEl.html() + "";

        var nextUrl = "";
        doc.select(".conL .btnW a").forEach(function(el) {
            var href = absUrl(el.attr("href"));
            if (href && isSameChapterPage(href, basePart) && !seen[href]) {
                nextUrl = href;
            }
        });

        url = nextUrl;
    }

    content = cleanContent(content);
    if (!content) return Response.error("No content found");
    return Response.success(content);
}
