// gen.js — Danh sách truyện từ 1 trang URL
// Contract: execute(url, page) → [{name*, link*, cover?, description?, host?, tag?}], nextPage?
// QUAN TRỌNG: nextPage phải là string, không phải số!
function execute(url, page) {
    if (!page) page = "1";

    // Normalize URL — thay domain nếu khác
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);

    // TODO: Cập nhật cách phân trang (path hoặc query)
    // Kiểu path:  url.replace("{{page}}", page)
    // Kiểu query: url + "?page=" + page  (nếu page > 1)
    var pageUrl = url.replace("{{page}}", page);

    var res = fetch(pageUrl);
    if (!res.ok) return Response.error("Cannot load: " + res.status);

    var doc = res.html();
    var data = [];
    var seen = {};

    // TODO: selector container mỗi cuốn truyện trong danh sách
    doc.select("SELECTOR_ITEM").forEach(function (el) {

        // TODO: selector thẻ <a> chứa tên + link truyện (trong container trên)
        var linkEl = el.select("SELECTOR_TITLE_LINK").first();

        // TODO: selector thẻ <img> ảnh bìa
        var imgEl = el.select("img").first();

        if (!linkEl) return;

        var link = (linkEl.attr("href") || "") + "";
        if (!link || seen[link]) return;
        seen[link] = true;

        if (!link.startsWith("http")) link = BASE_URL + link;

        // Ưu tiên data-src (lazy-load), fallback sang src
        var cover = imgEl ? ((imgEl.attr("data-src") || imgEl.attr("src") || "") + "") : "";
        if (cover.startsWith("//")) cover = "https:" + cover;
        if (cover && !cover.startsWith("http")) cover = BASE_URL + cover;

        // ✅ Chỉ encode phần path + query (nếu cần)
        try {
            var urlObj = new URL(cover);
            // encode pathname (tránh lỗi space, unicode…)
            urlObj.pathname = urlObj.pathname
                .split("/")
                .map(p => encodeURIComponent(p))
                .join("/");
            cover = urlObj.toString();
        } catch (e) {
            // fallback nếu URL lỗi format
            cover = encodeURI(cover);
        }
        let tag = el.select(".Demo").text().trim();
        data.push({
            name: linkEl.text().trim() + "",
            link: link,
            cover: cover,
            description: "",
            host: BASE_URL,
            tag: tag
        });
    });

    // TODO: selector kiểm tra có trang kế tiếp không
    // Ví dụ: a[rel=next], .pagination .next, li.next a
    var hasNext = doc.select("SELECTOR_NEXT_PAGE").size() > 0;
    var nextPage = hasNext ? String(parseInt(page) + 1) : null;

    return Response.success(data, nextPage);
}
