var BASE_URL = "https://www.uushuk.com";
var SEARCH_URL = "https://www.rrssk.com";
var SEARCH_KEY = "lzxHpH8PLGXcrCIQ";
var SEARCH_UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/125 Safari/537.36";
load("crypto.js");
function absUushukUrl(href) {
    href = (href || "") + "";
    if (!href) return "";
    href = href.replace(/^https?:\/\/(?:www\.)?(?:kelexs|rrssk)\.com/i, BASE_URL);
    if (href.indexOf("//") === 0) return "https:" + href;
    if (href.indexOf("http") === 0) return href;
    return href.indexOf("/") === 0 ? BASE_URL + href : BASE_URL + "/" + href;
}

function padZero(text, length) {
    text = (text || "") + "";
    while (text.length < length) text += "\0";
    return text;
}

function aesSearchKey(key) {
    var aesKey = CryptoJS.enc.Utf8.parse(padZero(SEARCH_KEY, 32));
    var iv = CryptoJS.enc.Utf8.parse(padZero(SEARCH_KEY, 16));
    var encrypted = CryptoJS.AES.encrypt(key, aesKey, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return encodeURIComponent(encrypted.toString());
}

function execute(key, page) {
    if (!page) page = "1";
    if (!key) return Response.success([]);

    var currentPage = parseInt(page);
    if (!currentPage || currentPage < 1) currentPage = 1;

    var url = SEARCH_URL + "/k-" + aesSearchKey(key) + (currentPage > 1 ? "-" + currentPage : "") + ".html";
    var res = fetch(url, {
        headers: {
            "user-agent": SEARCH_UA
        }
    });
    if (!res.ok) return Response.error("Cannot search: " + res.status);

    var html = res.text();
    var doc = Html.parse(html);
    var data = [];
    var seen = {};

    doc.select(".searchIBox .dList li, .dList li").forEach(function(el) {
        var linkEl = el.select(".name a").first();
        if (!linkEl) return;

        var idMatch = (el.html() + "").match(/upclick\('([^']+)'\)/);
        if (!idMatch) return;

        var link = BASE_URL + "/book/" + idMatch[1] + ".html";
        if (!link || seen[link] || link.indexOf("/book/") < 0) return;
        seen[link] = true;

        var imgEl = el.select("img").first();
        var cover = imgEl ? absUushukUrl(imgEl.attr("data-src") || imgEl.attr("src")) : "";
        var info = el.select(".info .dlS");
        var author = info.size() > 0 ? info.get(0).select("dd").text().trim() : "";
        var tag = info.size() > 1 ? info.get(1).select("dd").text().trim() : "";
        var intro = el.select(".intro").text().trim();

        data.push({
            name: linkEl.text().trim(),
            link: link,
            cover: cover,
            description: author ? author + "\n" + intro : intro,
            host: BASE_URL,
            tag: tag
        });
    });

    var nextHref = doc.select(".page a.next").attr("href") + "";
    return Response.success(data, nextHref ? String(currentPage + 1) : null);
}
