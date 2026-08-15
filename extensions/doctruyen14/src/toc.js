load('config.js');

function execute(url) {
    url = String(url || "").replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    if (url.slice(-1) !== "/") url = url + "/";
    console.log(url);

    var response = fetch(url, {
        headers: {
            "User-Agent": UserAgent.chrome(),
            "Accept-Language": "vi-VN,vi;q=0.9,en;q=0.8"
        }
    });
    if (!response.ok) return Response.error("Khong the tai muc luc (HTTP " + response.status + ")");

    var doc = response.html();
    var data = [];
    var seen = {};
    var select = doc.select("select.chapter-jump").first();

    function addChapter(name, chapterUrl) {
        chapterUrl = String(chapterUrl || "").trim();
        if (!chapterUrl) return;
        if (seen[chapterUrl]) return;
        seen[chapterUrl] = true;
        data.push({
            name: String(name || "").trim() || "Chuong " + (data.length + 1),
            url: chapterUrl,
            host: BASE_URL
        });
    }

    if (select) {
        var page1Url = select.attr("data-url-page1") + "";
        var urlTpl = select.attr("data-url-tpl") + "";
        var pageToken = select.attr("data-page-token") + "";
        var options = select.select("option");
        for (var i = 0; i < options.size(); i++) {
            var option = options.get(i);
            var value = option.attr("value") + "";
            var chapterNo = parseInt(value, 10);
            var chapterUrl = "";

            if (value === "1") {
                chapterUrl = page1Url || url;
            } else if (urlTpl && pageToken) {
                chapterUrl = urlTpl.replace(pageToken, value);
            } else {
                chapterUrl = url.replace(/\/$/, "") + "/" + value + "/";
            }

            addChapter("Chương " + (chapterNo || (i + 1)), chapterUrl);
        }
    }

    if (data.length === 0) {
        var links = doc.select(".wp-pagenavi a[href]");
        var last = 1;
        addChapter("Chuong 1", url);

        for (var j = 0; j < links.size(); j++) {
            var item = links.get(j);
            var href = item.attr("href") + "";
            var text = item.text() + "";
            var number = 0;
            var match = href.match(/\/(\d+)\/?$/);
            if (match && match[1]) number = parseInt(match[1], 10);
            if (!number && /^\d+$/.test(text)) number = parseInt(text, 10);
            if (number > last) last = number;
        }

        for (var k = 2; k <= last; k++) {
            addChapter("Chuong " + k, url.replace(/\/$/, "") + "/" + k + "/");
        }
    }

    return Response.success(data);
}
