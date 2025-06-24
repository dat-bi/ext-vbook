load('libs.js');
load('config.js');

function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL)
    var response = fetch(url);
    if (response.ok) {
        var doc = response.html();
        doc.select('em').remove()
        doc.select('center').remove()
        doc.select(' a[target="_blank"]').remove()
        var htm = doc.select('.ndtruyen').html();
        htm = htm.replace(/<br>|\\n/g, "<br><br>")
        return Response.success(htm);
    }
    return null;
}
