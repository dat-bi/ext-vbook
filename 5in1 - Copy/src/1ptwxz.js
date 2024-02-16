function getDetailPtwxz(url) {
    var host = 'https://www.piaotian.com';

    var response = fetch(url);
    var doc = response.html('gb2312');

    var author = $.QA(doc, '#content table table td', { f: x => /作.*者：/.test(x.text()), m: x => x.text().replace(/作.*者：/, '').replace('<br', '').trim(), j: ' ' });
    var category = $.QA(doc, '#content table table td', { f: x => /类.*别：/.test(x.text()), m: x => x.text().replace(/类.*别：/, '').replace('<br', '').trim(), j: ' ' });
    var cover = $.Q(doc, '#content table table a > img[align][hspace][vspace]').attr('src');
    var description = $.Q(doc, '#content table table div[style]:not([id]):not([onclick])', { remove: 'span, a' }).html();
    description = cleanHtml(description);
    let data = {
        name: $.Q(doc, '#content h1').text(),
        cover: cover,
        author: author,
        description: description,
        detail: String.format('作者: {0}<br>类别: {1}', author, category),
        host: host
    }
    return data
}
function getChapPtwxz(url) {
    var response = fetch(url);
    var doc = response.html('gb2312');
    var htm = $.Q(doc, 'body', { remove: 'h1, div, table, script, center' }).html();
    htm = cleanHtml(htm);
    return htm.replace(/<br\s*\/?>|\n/g, "<br><br>");
}
function getTocPtwxz1(url) {
    var host = 'https://www.piaotian.com';
    url = url.replace(/www\.piaotian\.com\/bookinfo\/(\d+)\/(\d+)\.html$/, 'www.piaotian.com/html/$1/$2/').append('/');

    var response = fetch(url);
    var doc = response.html('gb2312');

    var data = [];
    var elems = $.QA(doc, 'div.centent li > a');

    if (!elems.length) return Response.error(url);

    elems.forEach(function (e) {
        data.push({
            name: e.text(),
            url: e.attr('href').mayBeFillHost(url),
            host: host
        })
    });

    return data;
}
function getTocPtwxz(id) {
    let url = `https://www.piaotian.com/html/${Math.floor(id / 1000)}/${id}/`;
    var response = fetch(url);
    var doc = response.html('gb2312');

    var data = [];
    var elems = $.QA(doc, 'div.centent li > a');

    if (!elems.length) return Response.error(url);

    elems.forEach(function (e) {
        data.push({
            name: e.text(),
            url: e.attr('href').mayBeFillHost(url),
            host: "https://www.piaotian.com"
        })
    });
    return data;
}
function gg(ii){
    console.log(STVHOST + "ii" + ii)
}