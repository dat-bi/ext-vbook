load('libs.js');

function execute(url, page) {
    const host = 'https://www.piaotian5.net';

    var response = fetch(host + url);
    if (response.ok) {
        var doc = response.html();
        var data = [];

        var elems = $.QA(doc, 'div.l.bd li');
        if (!elems.length) return Response.error(url);
        
        elems.forEach(function(e) {
            var link = $.Q(e, '.s2 a').attr('href');
            var m, id, cover;

            if ((m = link.match(/book\/(\d+)/)) && m[1] && (id = m[1])) {
                cover = String.format('{0}/files/article/image/{1}/{2}/{3}s.jpg', host, Math.floor(id / 1000), id, id);
                // https://www.piaotian5.com/files/article/image/9/9357/9357s.jpg
            }

            data.push({
                name: $.Q(e, '.s2 a').text(),
                link: link.append('/'),
                cover: cover || 'https://www.piaotian5.net/images/nocover.jpg',
                description: $.Q(e, '.s3 a').text(),
                host: host
            })
        })

        return Response.success(data)
    }
    return null;
}