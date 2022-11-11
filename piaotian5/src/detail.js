load('libs.js');

function execute(url) {
    const host = 'https://www.piaotian5.net';
    url = url.replace('m.piaotian5.net', 'www.piaotian5.net');

    var response = fetch(url);
    if (response.ok) {
        var doc = response.html();

        var coverImg = $.Q(doc, '#fmimg img').attr('src');
        var author = $.Q(doc, '#info p').text().replace(/作.*者：/, '');

        return Response.success({
            url: url.rtrim('/'),
            name: $.Q(doc, '#info h1').text(),
            cover: coverImg,
            author: author,
            description: $.Q(doc, '#intro').text().replace(/各位书友要是觉得.*?还不错的话请不要忘记向您QQ群和微博里的朋友推荐哦！/, '').trim(),
            detail: String.format('作者: {0}<br>{1}', author, $.Q(doc, '#info > p', 4).text()),
            host: host
        });
    }
    return null;
}