load('libs.js');

function execute(url) {
    url = url.replace('xinyushuwu.com', 'xinyushuwu.org');
    url = url.replace('xinyushuwu.org', 'xinyushuwu.net');
    url = url.replace('m.xinyushuwu.net', 'www.xinyushuwu.net');
    var host = 'https://www.xinyushuwu.net';
    url = url.replace('m.xinyushuwu.net', 'www.xinyushuwu.net').append('/');
    var doc = Http.get(url).html('gbk');

    var data = [];
    var elems = $.QA(doc, '.ml_list li > a');
    if (!elems.length) return Response.error(url);
    
    elems.forEach(function(e) {
        data.push({
            name: e.text(),
            url: e.attr('href').mayBeFillHost(url),
            host: host,
        })
    });

    return Response.success(data);
}