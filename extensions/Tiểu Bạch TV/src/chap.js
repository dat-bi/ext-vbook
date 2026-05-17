load('config.js');

function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);

    var res = fetch(url, { headers: { "User-Agent": UserAgent.chrome() } });
    if (!res.ok) return Response.error("Cannot load: " + res.status);

    var doc = res.html();
    var tracks = [];

    var source = doc.select("#video-source").first();
    var stream = source ? (source.attr("src") || "") + "" : "";
    if (!stream) stream = doc.select("video source").attr("src") + "";
    if (stream.indexOf("//") === 0) stream = "https:" + stream;
    if (stream && stream.indexOf("http") !== 0) {
        stream = stream.indexOf("/") === 0 ? BASE_URL + stream : BASE_URL + "/" + stream;
    }

    if (stream) tracks.push({ title: "HLS", data: stream });

    if (tracks.length === 0) return Response.error("No stream found");
    return Response.success(tracks);
}
