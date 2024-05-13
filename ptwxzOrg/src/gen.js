load('libs.js');
load('config.js');

function execute(url, page) {
    page = page || '1';
    url = BASE_URL + url + page + ".html"
    // console.log(url)
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        var data = [];
        var elems = $.QA(doc, '.hot_sale');
        if (!elems.length) return Response.error(url);
        elems.forEach(function(e) {
            data.push({
                name: $.Q(e, '.title').text().trim(),
                link: BASE_URL + $.Q(e, 'a').attr('href'),
                cover: $.Q(e, 'img').attr('src').trim(),
                description: $.Q(e, '.author').text(),
            })
        })
        var next = parseInt(page, 10) + 1;
        return Response.success(data, next.toString());
    }
    return null;
}