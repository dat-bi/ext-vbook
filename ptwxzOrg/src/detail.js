load('libs.js');
load('config.js');

function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL).replace("index.html","");
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();

        return Response.success({
            name: $.Q(doc, 'header > h1').text(),
            cover: $.Q(doc, '.synopsisArea_detail img').attr('src'),
            author: $.Q(doc, '.author').text().trim(),
            description: $.Q(doc, '.review').html(),
            detail: $.QA(doc, '.synopsisArea_detail p', {m: x => x.text(), j: '<br>'}),
            host: BASE_URL
        })
    }
    return null;
}