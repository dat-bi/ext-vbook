// chap.js — Lấy danh sách server/phân giải stream cho 1 tập video
// Contract: execute(url) → [{ title*, data* }]
load('config.js');

function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);

    var res = fetch(url, { headers: { "User-Agent": UserAgent.chrome() } });
    if (!res.ok) return Response.error("Cannot load: " + res.status);

    var doc = res.html();
    var tracks = [];

    // HentaiZ embeds player URL in JSON-LD (VideoObject.embedUrl)
    var embedUrl = "";
    doc.select('script[type="application/ld+json"]').forEach(function (el) {
        if (embedUrl) return;
        var txt = (el.html() || "") + "";
        if (txt.indexOf('"@type":"VideoObject"') === -1) return;
        try {
            var obj = JSON.parse(txt);
            if (obj && obj.embedUrl) embedUrl = (obj.embedUrl + "");
        } catch (e) {}
    });

    if (embedUrl) {
        tracks.push({ title: "Server", data: embedUrl });
    }

    if (tracks.length === 0) {
        // Fallback: let track.js handle the watch page directly
        tracks.push({ title: "Default", data: url });
    }

    return Response.success(tracks);
}
