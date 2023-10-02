load('libs.js');

function execute(url, page) {
    var host = 'https://www.xinyushuwu.net';
    if (!page) page = '1';
    url = String.format(host + url, page);
    var doc = Http.get(url).html('gbk');

    var data = [];

    var elems = $.QA(doc, '#rankinglist > tbody > tr +tr');
    if (!elems.length) return Response.error(url);
    
    elems.forEach(function(e) {
        data.push({
            name: $.Q(e, 'td:nth-child(1) > p > a').text(),
            link: $.Q(e, 'td:nth-child(1) > p > a').attr('href'),
            description: $.Q(e, 'td:nth-child(3) > p').text(),
            host: host
        })
    })

    var next = $.Q(doc, '#pagelink > strong + a').text();
    if (next && /\d+/.test(next)) return Response.success(data, next);
    
    return Response.success(data);
}