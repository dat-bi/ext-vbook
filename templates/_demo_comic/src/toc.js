// toc.js (Comic) — Mục lục chương/tập
// Contract: execute(url) → [{ name*, url*, host? }]
// Nhận url từ page.js — mỗi call = 1 trang mục lục
function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:www\.)?([^\/]+)/, BASE_URL);
    if (url.slice(-1) === "/") url = url.slice(0, -1);

    var res = fetch(url);
    if (!res.ok) return Response.error("Cannot load: " + res.status);

    var doc = res.html();
    var chapters = [];
    var seen = {};

    // TODO: Selector các thẻ <a> của từng chương trong danh sách
    // Ví dụ: ".chapter-list a", "#list-chapter a", ".volume .chap a"
    doc.select("SELECTOR_CHAPTER_LINKS").forEach(function(el) {
        var name    = el.text().trim() + "";
        var chapUrl = (el.attr("href") || "") + "";
        if (!name || !chapUrl || seen[chapUrl]) return;
        seen[chapUrl] = true;
        if (!chapUrl.startsWith("http")) {
            chapUrl = chapUrl.startsWith("/") ? BASE_URL + chapUrl : BASE_URL + "/" + chapUrl;
        }
        chapters.push({ name: name, url: chapUrl, host: BASE_URL });
    });

    if (chapters.length === 0) return Response.error("No chapters found");
    return Response.success(chapters);
}
