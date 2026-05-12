// toc.js — Mục lục chương
// Contract: execute(url) → [{ name*, url*, host? }]
// Được gọi lần lượt với từng URL từ page.js (mỗi call = 1 trang mục lục)
function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    if (url.slice(-1) === "/") url = url.slice(0, -1);

    var res = fetch(url);
    if (!res.ok) return Response.error("Cannot load: " + res.status);

    var doc = res.html();
    var chapters = [];
    var seen = {};

    // TODO: Selector các thẻ <a> của từng chương trong mục lục
    // Thường là: "#list-chapter a", ".chapter-list a", ".danh-sach a"
    doc.select("SELECTOR_CHAPTER_LINKS").forEach(function(el) {
        var name     = el.text().trim() + "";
        var chapUrl  = (el.attr("href") || "") + "";

        if (!name || !chapUrl) return;
        if (seen[chapUrl]) return;
        seen[chapUrl] = true;

        if (!chapUrl.startsWith("http")) {
            chapUrl = chapUrl.startsWith("/") ? BASE_URL + chapUrl : BASE_URL + "/" + chapUrl;
        }

        // Phát hiện chương VIP/trả phí
        var isPaid = el.select(".vip, .paid, .lock, .khoa").size() > 0;

        chapters.push({
            name: name,
            url:  chapUrl,
            host: BASE_URL,
            pay:  isPaid || undefined
        });
    });

    if (chapters.length === 0) return Response.error("No chapters found");
    return Response.success(chapters);
}
