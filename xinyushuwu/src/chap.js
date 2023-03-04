load('libs.js');

function execute(url) {
    url = url.replace('xinyushuwu.com', 'xinyushuwu.org');
    url = url.replace('xinyushuwu.org', 'xinyushuwu.net');
    url = url.replace('m.xinyushuwu.net', 'www.xinyushuwu.net');
    var doc = Http.get(url).html('gbk');
    var htm = $.Q(doc, '#articlecontent').html();

    htm = cleanHtml(htm);
    // log(htm);

    return Response.success(htm.replace(/<br\s*\/?>|\n/g,"<br><br>"));
}