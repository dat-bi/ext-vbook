load('config.js');

function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL)
    if (url.slice(-1) !== "/") url = url + "/";
    console.log(url)
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        doc.select("input").remove()
        let htm = doc.select('.entry-content').html();
        htm = htm.replace(/<br>|\\n/g, "<br><br>")
        return Response.success(htm);
    }
    return null;
}
