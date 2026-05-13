// search.js — Tìm kiếm truyện
// Contract: execute(key, page) → [{ name*, link*, cover?, description?, host? }], nextPage?
function execute(key, page) {
    if (!page) page = "1";

    // TODO: Cập nhật URL và query parameter tìm kiếm của site
    // Cách 1 (query string):    BASE_URL + "/search?q=" + encodeURIComponent(key) + "&page=" + page
    // Cách 2 (VBook queries):   fetch(url, { queries: { keyword: key, page: page } })
    var res = fetch(BASE_URL + "/DUONG_DAN_SEARCH", {
        queries: { PARAM_KEYWORD: key, PARAM_PAGE: page }
    });
    if (!res.ok) return Response.error("Search failed: " + res.status);

    var doc = res.html();
    var data = [];
    var seen = {};

    // TODO: Selector giống gen.js (kết quả tìm kiếm thường dùng cùng layout)
    doc.select("SELECTOR_ITEM").forEach(function(el) {
        var linkEl = el.select("SELECTOR_TITLE_LINK").first();
        var imgEl  = el.select("img").first();
        if (!linkEl) return;

        var link = (linkEl.attr("href") || "") + "";
        if (!link || seen[link]) return;
        seen[link] = true;

        if (!link.startsWith("http")) link = BASE_URL + link;
        var cover = imgEl ? ((imgEl.attr("data-src") || imgEl.attr("src") || "") + "") : "";
        if (cover.startsWith("//")) cover = "https:" + cover;

        data.push({
            name:        linkEl.text().trim() + "",
            link:        link,
            cover:       cover,
            description: "",
            host:        BASE_URL
        });
    });

    var hasNext = doc.select("SELECTOR_NEXT_PAGE").size() > 0;
    return Response.success(data, hasNext ? String(parseInt(page) + 1) : null);
}
