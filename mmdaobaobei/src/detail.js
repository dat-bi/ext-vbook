load('libs.js');
function execute(url) {
    var doc = Http.get(url).html();
    return Response.success({
        name: $.Q(doc, '.wrap_fl > div.wrap_article > div.article_top > h1').text(),
        cover: "https://raw.githubusercontent.com/dat-bi/ext-vbook/main/anh-bia/1.png",
        author: null,
        description: $.Q(doc, 'body > div.wrap_box > div.wrap_fl > div.wrap_article > div.article_top > div').text(),
        detail: null,
    });
}