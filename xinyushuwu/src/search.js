load('libs.js');

function execute(key, page) {
    var host = 'https://www.xinyushuwu.org';
    var searchUrl = '{0}/modules/article/search.php?searchkey={1}&page={2}';

    var gbkEncode = function(s) {
        load('gbk.js');
        return GBK.encode(s);
    }

    var http = Http.get(String.format(searchUrl, host, gbkEncode(key), page || '1'));
    var doc = http.html('gbk');

    var data = [];

    var elems = $.QA(doc, 'table tr:not([align])');
    
    if (elems.length) {
        elems.forEach(function(e) {
            var link = $.Q(e, 'a').attr('href');
            data.push({
                name: $.Q(e, 'a').text().trim(),
                link: $.Q(e, 'a').attr('href'),
                cover: genCover(host, link),
                description: $.Q(e, 'td.odd', 1).text(),
                host: host
            })
        })

        return Response.success(data);
    }

    if ($.Q(doc, '.catalog img').attr('src')) { // detail.js
        var bookId = $.Q(doc, '.introduce a[href*="vote"]').attr('href').match(/(\d+)/);
        if (bookId && bookId[1]) {
            return Response.success([{
                name: $.Q(doc, '.introduce > h1').text(),
                link: String.format('{0}/{1}/{2}/', host, Math.floor(bookId[1] / 1000), bookId[1]),
                cover: $.Q(doc, '.catalog img').attr('src'),
                description: $.Q(doc, '.introduce a[href*="author"]').text(),
                host: host
            }])
        }
    }

    return Response.error(key);
}

function genCover(host, bookUrl) {
    var m, id;
    if ((m = bookUrl.match(/\d+\/(\d+)/)) && m[1] && (id = m[1])) {
        return String.format('{0}/files/article/image/{1}/{2}/{2}s.jpg', host, Math.floor(id / 1000), id);
    }

    return host + '/modules/article/images/nocover.jpg';
}