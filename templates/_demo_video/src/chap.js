// chap.js — Lấy danh sách server/phân giải stream cho 1 tập video
// Contract: execute(url) → [{ title*, data* }]
load('config.js');

function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);

    var res = fetch(url);
    if (!res.ok) return Response.error("Cannot load: " + res.status);

    var doc = res.html();
    var tracks = [];

    // TODO: Cập nhật selector lấy các server phát hoặc iframe
    // Ví dụ lấy nhiều server cho tập này
    /*
    doc.select("SELECTOR_STREAM_LINKS").forEach(function(el) {
        var serverTitle = el.text().trim() || "Server";
        var serverUrl = el.attr("data-src") || el.attr("src") || el.attr("href");
        if (serverUrl) {
            tracks.push({
                title: serverTitle,
                data: serverUrl
            });
        }
    });
    */

    // Mặc định ví dụ chưa rõ DOM
    // tracks.push({
    //     title: "Default",
    //     data: url
    // });

    if (tracks.length === 0) return Response.error("No stream found");
    return Response.success(tracks);
}
