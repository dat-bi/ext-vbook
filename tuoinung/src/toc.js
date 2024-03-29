load('config.js');
load('libs.js')
function execute(url) {
    var response = fetch(url);
    if (response.ok) {
        var doc = response.html();
        var data = [];

        data.push({
            name: "Phần 1",
            url: url,
            host: BASE_URL
        })

        var elems = $.QA(doc, '.phantrangcon a.post-page-numbers');
        elems.forEach(function(e) {
            data.push({
                name: e.text(),
                url: e.attr('href'),
                host: BASE_URL
            })
        });

        return Response.success(data);
    }
    return null;
}