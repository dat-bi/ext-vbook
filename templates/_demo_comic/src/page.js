// page.js (Comic) — Nhận URL detail, trả về mảng URL trang mục lục cho toc.js
// Contract: execute(url) → [urlString, ...]
function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:www\.)?([^\/]+)/, BASE_URL);
    if (url.slice(-1) === "/") url = url.slice(0, -1);

    var res = fetch(url);
    if (!res.ok) return Response.error("Cannot load: " + res.status);

    var doc = res.html();
    var pages = [];

    // TODO: Selector các trang phân trang mục lục (nếu TOC bị chia nhiều trang)
    // Ví dụ: ".pagination a", ".page-list a"
    // Nếu TOC không phân trang → bỏ phần select bên dưới, chỉ return [url]
    doc.select("SELECTOR_TOC_PAGINATION").forEach(function(el) {
        var href = (el.attr("href") || "") + "";
        if (!href || href.indexOf("#") > -1) return;
        if (!href.startsWith("http")) href = BASE_URL + href;
        if (pages.indexOf(href) === -1) pages.push(href);
    });

    if (pages.length === 0) return Response.success([url]);
    return Response.success(pages);
}
