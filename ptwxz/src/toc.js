load('libs.js');

function execute(url) {
    var host = 'https://www.ptwxz.com';
    // https://www.ptwxz.com/bookinfo/12/12450.html --> www.ptwxz.com/html/$1/$2/
    url = url.replace(/www\.ptwxz\.com\/bookinfo\/(\d+)\/(\d+)\.html$/, 'www.ptwxz.com/html/$1/$2/').append('/');

    var response = fetch(url);
    if (response.ok) {
        var doc = response.html('gb2312');

        var data = [];
        var elems = $.QA(doc, 'div.centent li > a');

        if (!elems.length) return Response.error(url);

        elems.forEach(function(e){
            data.push({
                name: e.text(),
                url: e.attr('href').mayBeFillHost(url),
                host: host
            })
        });

        return Response.success(data);
    }
    return null;
}