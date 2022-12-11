load('libs.js');

function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img,"truyensextv.com")
    var response = fetch(url);
    if (response.ok) {
        var doc = response.html();
        var htm = $.Q(doc, '.ndtruyen', {remove: 'em, center, a[target="_blank"]'}).html();
        return Response.success(htm);
    }
    return null;
}