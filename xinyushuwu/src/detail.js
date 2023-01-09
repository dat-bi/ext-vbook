load('libs.js');

function execute(url) {
    url = url.replace('xinyushuwu.com', 'xinyushuwu.org');
    var host = 'https://www.xinyushuwu.org';
    url = url.replace('m.xinyushuwu.org', 'www.xinyushuwu.org').append('/');
    var doc = Http.get(url).html('gbk');

    var author = $.Q(doc, '.introduce a[href*="author"]').text();
    var lastUpdated = $.Q(doc, '.bq > span').text();

    return Response.success({
        name: $.Q(doc, '.introduce > h1').text(),
        cover: 'https://www.xinyushuwu.org/modules/article/images/nocover.jpg',
        author: author,
        description: $.Q(doc, '.jj').text(),
        detail: String.format('作者: {0}<br>{1}', author, lastUpdated),
        host: host
    });
}