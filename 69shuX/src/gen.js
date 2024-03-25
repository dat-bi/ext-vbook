load('libs.js');
load('config.js');

function execute(url, page) {
    page = page || '1';
    url = String.format(BASE_URL + url, page);
    // console.log(url)
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        var data = [];
        var elems = $.QA(doc, '#article_list_content li');
        if (!elems.length) return Response.error(url);
        elems.forEach(function(e) {
            data.push({
                name: $.Q(e, '.newnav h3 > a:not([class])').text().trim(),
                link: $.Q(e, 'h3 > a').attr('href'),
                cover: $.Q(e, '.imgbox > img').attr('data-src').trim(),
                description: $.Q(e, '.zxzj > p').text().replace('最近章节', ''),
                host: BASE_URL
            })
        })
        var next = parseInt(page, 10) + 1;
        return Response.success(data, next.toString());
    }
    return null;
}