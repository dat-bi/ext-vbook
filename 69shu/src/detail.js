load('libs.js');

function execute(url) {
    var host = 'https://www.69shu.com';
    url = url.replace(/.+\.69shu\.com\/txt\/(\d+)\.htm/, 'https://www.69shu.com/txt/$1.htm');

    let response = fetch(url);
    if (response.ok) {
        let doc = response.html('gbk');

        return Response.success({
            name: $.Q(doc, 'div.booknav2 > h1 > a').text(),
            cover: $.Q(doc, 'div.bookimg2 > img').attr('src'),
            author: $.Q(doc, 'div.booknav2 > p:nth-child(2) > a').text().trim(),
            description: $.Q(doc, 'div.navtxt > p').html(),
            detail: $.QA(doc, 'div.booknav2 p', {m: x => x.text(), j: '<br>'}),
            host: host
        })
    }
    return null;
}