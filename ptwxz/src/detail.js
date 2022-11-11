load('libs.js');

function execute(url) {
    var host = 'https://www.ptwxz.com';

    var response = fetch(url);
    if (response.ok) {
        var doc = response.html('gb2312');

        var author = $.QA(doc, '#content table table td', {f: x => /作.*者：/.test(x.text()), m: x => x.text().replace(/作.*者：/, '').replace('<br', '').trim(), j: ' '}); 
        var category = $.QA(doc, '#content table table td', {f: x => /类.*别：/.test(x.text()), m: x => x.text().replace(/类.*别：/, '').replace('<br', '').trim(), j: ' '}); 
        var cover = $.Q(doc, '#content table table a > img[align][hspace][vspace]').attr('src');
        var description = $.Q(doc, '#content table table div[style]:not([id]):not([onclick])', {remove: 'span, a'}).html();
        description = cleanHtml(description);

        return Response.success({
            name: $.Q(doc, '#content h1').text(),
            cover: cover,
            author: author,
            description: description,
            detail: String.format('作者: {0}<br>类别: {1}', author, category),
            host: host
        });
    }
    return null;
}