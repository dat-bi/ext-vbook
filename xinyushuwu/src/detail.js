load('libs.js');
load('config.js');
function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL).append('/')
    var doc = Http.get(url).html('gbk');
    var author = $.Q(doc, '.introduce a[href*="author"]').text();
    var lastUpdated = $.Q(doc, '.bq > span').text();

    return Response.success({
        name: $.Q(doc, '.introduce > h1').text(),
        cover: BASE_URL + '/modules/article/images/nocover.jpg',
        author: author,
        description: $.Q(doc, '.jj').text(),
        detail: String.format('作者: {0}<br>{1}', author, lastUpdated),
        host: BASE_URL
    });
}