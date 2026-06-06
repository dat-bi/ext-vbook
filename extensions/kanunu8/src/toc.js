function execute(url) {
    url = (url + "").replace('index.html','');
    if (url.slice(-1) !== "/" && url.indexOf(".html") < 0) {
        url = url + "/";
    }
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html('gbk');
        var el = doc.select(".mulu-list a[href$=.html]");
        if (el.size() === 0) {
            el = doc.select("body > div:nth-child(1) > table:nth-child(10) > tbody > tr:nth-child(4) > td > table:nth-child(2) > tbody td a");
            if (el.size() === 0) {
                el = doc.select("body > div.main > div.col-left > div > dl dd a");
                if (el.size() === 0) {
                    el = doc.select("body > div.main > div.col-left > div > table:nth-child(4) > tbody tr td a");
                    if (el.size() === 0) {
                        el = doc.select("body > div:nth-child(1) > table:nth-child(10) > tbody > tr > td:nth-child(2) > table:nth-child(4) > tbody > tr > td > table:nth-child(2) > tbody tr td a");
                    }
                }
            }
        }
        const data = [];
        var sizeEl = el.size();
        for (let i = 0; i < sizeEl; i++) {
            var e = el.get(i);
            var href = e.attr("href");
            if ((href + "").indexOf(".html") < 0) continue;
            data.push({
                name: e.select("a").text(),
                url: toUrl(url, href),
                host: "https://www.kanunu8.com/"
            })
        }
        return Response.success(data);
    }
    return null;
}

function toUrl(base, href) {
    href = href + "";
    if (href.indexOf("http") === 0) return href;
    if (href.indexOf("/") === 0) return "https://www.kanunu8.com" + href;
    if (base.slice(-1) !== "/") {
        base = base.substring(0, base.lastIndexOf("/") + 1);
    }
    return base + href;
}
