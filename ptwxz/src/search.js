load('libs.js');

function execute(key, page) {
    var host = 'https://www.ptwxz.com';
    page = page || '1';

    var gbkEncode = function(s) {
        load('gbk.js');
        return GBK.encode(s);
    }

    var url = String.format('{0}/modules/article/search.php?searchtype=articlename&searchkey={1}&page={2}', host, gbkEncode(key), page);
    // log(url);

    var response = fetch(url);
    if (response.ok) {
        var doc = response.html('gbk');

        var data = [];

        if ($.Q(doc, '#content h1').text()) { // detail.js
            var bid = http.string().match(/addbookcase\.php\?bid=(\d+)/);
            if (bid && bid[1]) {
                return Response.success([{
                    name: $.Q(doc, '#content h1').text(),
                    link: String.format('{0}/bookinfo/{1}/{2}.html', host, Math.floor(parseInt(bid[1],10)/1000), bid[1]),
                    cover: $.Q(doc, '#content table table a > img[align][hspace][vspace]').attr('src'),
                    description: '',
                    host: host
                }]);
            }
        }

        var elems = $.QA(doc, 'table tr:not([align])');
        if (elems.length) {
            elems.forEach(function(e) {
                var link = $.Q(e, 'a').attr('href');
                data.push({
                    name: $.Q(e, 'a').text().trim(),
                    link: $.Q(e, 'a').attr('href'),
                    cover: genCover(link),
                    description: $.Q(e, 'td.odd', 1).text(),
                    host: host
                })
            })
            // log(data);
            return Response.success(data);
        }

        return Response.error(key);
    }
    return null;

    var http = Http.get(url);
    var doc = http.html('gbk');

}

function genCover(bookUrl) {
    var host = 'https://www.ptwxz.com', m, id;

    if ((m = bookUrl.match(/(\d+)\.html$/)) && m[1] && (id = m[1])) {
        // https://www.ptwxz.com/files/article/image/12/12450/12450s.jpg
        return String.format('{0}/files/article/image/{1}/{2}/{3}s.jpg', host, Math.floor(id / 1000), id, id);
    }

    return 'https://www.ptwxz.com/modules/article/images/nocover.jpg';
}