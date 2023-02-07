load('libs.js');
function execute(url) {
    var response = fetch(url);
    if (response.ok) {
        var doc = response.html();
        var htm = $.Q(doc, 'body > div.wrap_box > div.wrap_fl > div.wrap_article > div.article_body', { remove: 'audio,[target="_blank"]' }).html();
        htm = htm.replace(/&nbsp;/g,"")
        htm = htm.replace(/<br>|\\n/g,"<br><br>")
        return Response.success(htm);
    }
    return null;
}
