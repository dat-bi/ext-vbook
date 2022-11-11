load('libs.js');

function execute(url) {
    var response = fetch(url);
    if (response.ok) {
        var doc = response.html();
        var htm = $.Q(doc, '.ndtruyen', {remove: 'em, center, a[target="_blank"]'}).html();
        return Response.success(htm);
    }
    return null;
}