// page.js — Nhận URL detail, trả về mảng URL trang mục lục cho toc.js
// Contract: execute(url) → [urlString, ...]
// - Không phân trang: trả về [url] (toc.js tự parse toàn bộ)
// - Có phân trang:    trả về [url_trang1, url_trang2, ...]
function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    if (url.slice(-1) === "/") url = url.slice(0, -1);

    var res = fetch(url);
    if (!res.ok) return Response.error("Cannot load: " + res.status);

    var doc = res.html();
    var pages = [];

    // TODO: Selector các trang phân trang mục lục
    // Chỉ cần nếu TOC bị chia nhiều trang (Q7=Có)
    // Ví dụ: ".pagination a", "a[href*='trang/']", ".page-list a"
    doc.select("SELECTOR_TOC_PAGINATION").forEach(function(el) {
        var href = (el.attr("href") || "") + "";
        if (!href || href.indexOf("#") > -1) return;
        if (!href.startsWith("http")) href = BASE_URL + href;
        if (pages.indexOf(href) === -1) pages.push(href);
    });

    // Không có phân trang → toc.js tự xử lý toàn bộ trên 1 trang
    if (pages.length === 0) return Response.success([url]);
    return Response.success(pages);
}
