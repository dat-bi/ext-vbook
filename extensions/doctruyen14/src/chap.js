load('config.js');

function execute(url) {
    url = normalizeUrl(url);
    if (url.slice(-1) !== "/") url = url + "/";
    console.log(url);
    var response = fetch(url);
    if (!response.ok) return Response.error("Khong the tai noi dung chuong (HTTP " + response.status + ")");

    var doc = response.html();
    doc.select("input, .wp-pagenavi, script, style").remove();
    var htm = doc.select(".entry-content").html() + "";
    if (!htm) return Response.error("Khong tim thay noi dung chuong");
    return Response.success(htm.replace(/<br>|\\n/g, "<br><br>"));
}
