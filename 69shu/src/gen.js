load('libs.js');

function execute(url, page) {
    var host = 'https://www.69shu.com';

    page = page || '1';
    url = String.format(host + url, page);
    // log(url);

    let response = fetch(url);
    if (response.ok) {
        let doc = response.html('gbk');

        var data = [];

        var elems = $.QA(doc, 'li');
        if (!elems.length) return Response.error(url);

        elems.forEach(function(e) {
            data.push({
                name: $.Q(e, '.newnav h3 > a:not([class])').text().trim(),
                link: $.Q(e, '.newnav > a').attr('href'),
                cover: $.Q(e, '.imgbox > img').attr('data-src').trim(),
                description: $.Q(e, '.zxzj > p').text().replace('最近章节', ''),
                host: host
            })
        })

        var next = parseInt(page, 10) + 1;

        return Response.success(data, next.toString());
    }
    return null;
}