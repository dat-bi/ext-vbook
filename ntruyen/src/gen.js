load('config.js');
function execute(url, page) {
    let target = BASE_URL + url;
    if (page && !/([?&])page=\d+/.test(url)) {
        let separator = url.indexOf("?") >= 0 ? "&" : "?"
        target += separator + "page=" + page;
    }
    let response = fetch(target);
    if (response.ok) {
        let doc = response.html();
        let next = null
        let nextHref = doc.select("a[aria-label='Go to next page']").attr("href")
        if (nextHref) {
            let match = nextHref.match(/page=(\d+)/)
            if (match) next = match[1]
        }
        let el = doc.select("a[itemprop='hasPart']")
        let data = [];
        el.forEach(e => data.push({
            name: e.select("p[itemprop='name']").text(),
            link: e.attr("href"),
            cover: e.select("img[itemprop='image']").attr("data-src") || e.select("img[itemprop='image']").attr("src"),
            description: [
                e.select("[itemprop='author'] [itemprop='name']").text(),
                e.select("[itemprop='bookFormat']").text(),
                e.select("[itemprop='dateModified']").text(),
                e.select("[itemprop='genre']").text()
            ].filter(t => t && t.length > 0).join(" - "),
            host: BASE_URL
        }))
        return Response.success(data, next)
    }
    return null;
}
