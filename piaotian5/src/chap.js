load('libs.js');

function execute(url) {
    url = url.replace('m.piaotian5.net', 'www.piaotian5.net');

    var response = fetch(url);
    
    if (response.ok) {
        var doc = response.html();

        var htm = $.Q(doc, '#content').html();

        htm = cleanHtml(htm)
            .replace(/https.*piaotian5.*?(<br>|\n)/, '')
            .replace(/天才一秒记住本站地址.*?(<br>|$)/, '')
            ;

        return Response.success(htm);
    }
    return null;
}