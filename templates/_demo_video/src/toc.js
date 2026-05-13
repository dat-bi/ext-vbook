// toc.js — Mục lục tập phim
// Contract: execute(url) → [{ name*, url*, host? }]
// Được gọi để lấy danh sách tập phim (mỗi call = 1 trang list tập phim)
function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    if (url.slice(-1) === "/") url = url.slice(0, -1);

    var res = fetch(url);
    if (!res.ok) return Response.error("Cannot load: " + res.status);

    var doc = res.html();
    var chapters = [];
    var seen = {};

    // Gợi ý: Nếu có nhiều server, có thể tách danh sách thành các khu vực bằng cấu trúc section:
    // chapters.push({ name: "Tên Server (Ví dụ: Server VIP)", type: "section" });
   // Sau đó mới push các tập phim vào, giúp người dùng dễ chọn lựa hơn nếu có nhiều server hoặc nhiều loại tập phim (thuyết mình, phụ đề...)
    // TODO: Selector các thẻ <a> của từng tập phim
    // Thường là: "#list-episode a", ".server-episodes a", ".danh-sach a"
    doc.select("SELECTOR_EPISODE_LINKS").forEach(function(el) {
        var name     = el.text().trim() + "";
        var chapUrl  = (el.attr("href") || "") + "";

        if (!name || !chapUrl) return;
        if (seen[chapUrl]) return;
        seen[chapUrl] = true;

        if (!chapUrl.startsWith("http")) {
            chapUrl = chapUrl.startsWith("/") ? BASE_URL + chapUrl : BASE_URL + "/" + chapUrl;
        }


        chapters.push({
            name: name,
            url:  chapUrl,
            host: BASE_URL
        });
    });

    if (chapters.length === 0) return Response.error("No chapters found");
    return Response.success(chapters);
}
