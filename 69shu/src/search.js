load('libs.js');

function execute(key, page) {

    var host = 'https://www.69shu.com';

    // gb18030, gbk uri encode
    // '打更人' --> '%B4%F2%B8%FC%C8%CB'
    // https://www.69shu.com/modules/article/search.php?searchkey=%B4%F2%B8%FC%C8%CB&searchtype=all
    var gbkEncode = function(s) {
        load('gbk.js');
        return GBK.encode(s);
    }

    var url = String.format('{0}/modules/article/search.php?searchkey={1}&searchtype=all', host, gbkEncode(key));
    // log(url);

    let response = fetch(url);
    if (response.ok) {
        let doc = response.html('gbk');

        var data = [];

        var elems = $.QA(doc, '.newbox li');
        if (elems.length) {
            elems.forEach(function(e) {
                data.push({
                    name: $.Q(e, '.newnav h3 > a:not([class])').text().trim(),
                    link: $.Q(e, '.newnav > a').attr('href'),
                    cover: $.Q(e, '.imgbox > img').attr('data-src').trim(),
                    description: $.Q(e, '.zxzj > p').text().replace('最近章节', ''),
                    host: host
                })
            })

            return Response.success(data);
        }

        // '大奉'
        // https://www.69shu.com/modules/article/search.php?searchkey=%B4%F3%B7%EE&searchtype=all
        if ($.Q(doc, 'div.booknav2 > h1 > a').text()) { // detail.js
            return Response.success([{
                name: $.Q(doc, 'div.booknav2 > h1 > a').text(),
                link: $.Q(doc, 'div.booknav2 > h1 > a').attr('href'),
                cover: $.Q(doc, 'div.bookimg2 > img').attr('src'),
                description: $.Q(doc, 'div.booknav2 > p:nth-child(2) > a').text().trim(), // author
                host: host
            }]);
        }

        return Response.error(key);
    }
    
    return null;
}