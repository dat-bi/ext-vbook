load('config.js');

function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL)
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        doc.select('em').remove()
        doc.select('center').remove()
        doc.select(' a[target="_blank"]').remove()
        let htm = doc.select('.ndtruyen').html();
        htm = htm.replace(/<br>|\\n/g, "<br><br>")
        return Response.success(htm);
    }
    return null;
}
