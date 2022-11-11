load('libs.js');

function execute(url) {
    const host = 'https://www.piaotian5.net';
    url = url.replace('m.piaotian5.net', 'www.piaotian5.net');

    var response = fetch(url);
    if (response.ok) {
        var doc = response.html();

        var data = [];
        var elems = $.QA(doc, 'div.listmain dd > a');

        if (!elems.length) return Response.error(url);

        if (elems.length >= 6) {
            elems.splice(0, 6); // Remove first 6 items
        } else {
            elems.splice(0, elems.length/2);
        }

        elems.forEach(function(e){
            data.push({
                name: $.Q(e, 'a').text(),
                url: e.attr('href'),
                host: host
            })
        });

        return Response.success(data);
    }
    return null;
}