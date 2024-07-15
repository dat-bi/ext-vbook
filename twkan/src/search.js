load('libs.js');
load('config.js');

function execute(key, page) {
    var response = fetch(BASE_URL + "/modules/article/search.php", {
        method: "POST",
        body: {
            "searchkey": key,
            "searchtype": "all"
        }
    })
    if (response.ok) {
        let doc = response.html();
        var data = [];
        var elems = $.QA(doc, '.newbox li');
        if (elems.length) {
            elems.forEach(function(e) {
                data.push({
                    name: $.Q(e, '.newnav h3 > a:not([class])').text().trim(),
                    link: $.Q(e, '.newnav > a').attr('href'),
                    cover: $.Q(e, '.imgbox > img').attr('data-src').trim(),
                    description: $.Q(e, '.zxzj > p').text().replace('最近章节', ''),
                    host: BASE_URL
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
                host: BASE_URL
            }]);
        }

        return Response.error(key);
    }
    
    return null;
}