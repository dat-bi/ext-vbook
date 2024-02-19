load('libs.js');
load('config.js');
function execute(url, page) {
    if (!page) page = '1';
    url = String.format(BASE_URL + url, page);
    log(url)
    var doc = Http.get(url).html('gbk');

    var data = [];

    var elems = $.QA(doc, '.fl_right .tt');
    if (!elems.length) return Response.error(url);
    
    elems.forEach(function(e) {
        data.push({
            name: $.Q(e, 'h3 a').text(),
            link: $.Q(e, 'h3 a').attr('href'),
            cover: $.Q(e, '.pic img').attr('src') || 'https://raw.githubusercontent.com/dat-bi/ext-vbook/main/anh-bia/1.png',
            description: $.Q(e, '.pp .p1').text(),
            host: BASE_URL
        })
    })

    var next = $.Q(doc, '#pagelink > strong + a').text();
    if (next && /\d+/.test(next)) return Response.success(data, next);
    
    return Response.success(data);
}