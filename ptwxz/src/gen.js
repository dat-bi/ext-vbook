load('libs.js');

function execute(url, page) {
    var host = 'https://www.ptwxz.com';
    url = String.format(host + url, page || '1');

    var response = fetch(url);
    if (response.ok) {
        var doc = response.html('gbk');

        var data = [];

        var elems = $.QA(doc, 'table.grid tbody tr:not([align])');
        if (!elems.length) return Response.error(url);
        
        elems.forEach(function(e) {
            var link = $.Q(e, 'a').attr('href');
            var m, id, cover;

            if ((m = link.match(/(\d+)\.html/)) && m[1] && (id = m[1])) {
                cover = String.format('{0}/files/article/image/{1}/{2}/{3}s.jpg', host, Math.floor(id / 1000), id, id);
                // https://www.ptwxz.com/files/article/image/12/12450/12450s.jpg
            }

            data.push({
                name: $.Q(e, 'a').text(),
                link: link,
                cover: cover || 'https://www.ptwxz.com/modules/article/images/nocover.jpg',
                description: $.Q(e, 'td.odd', 1).text(),
                host: host
            })
        })

        var next = $.Q(doc, '#pagelink strong + a').text()

        return Response.success(data, next)
    }
    return null;
}