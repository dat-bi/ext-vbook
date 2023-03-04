load('libs.js');

function execute(url, page) {
    page = page || '1';
    var newUrl = String.format("https://truyenngontinh.net" + url + (page == '1' ? '/' : '/page/{0}/'), page);
    var response = fetch(newUrl);
    if (response.ok) {
        var doc = response.html();
        var data = [];

        var elems = $.QA(doc, 'body > div.logo2 > div.phdrbox > div.content_block > div em');
        if (!elems.length) return Response.error(url);

        elems.forEach(function(e) {
            var name = $.Q(e, 'a').text();
            if (name == '') return;
            data.push({
                name: name,
                link: $.Q(e, 'a').attr('href'),
                cover: 'https://raw.githubusercontent.com/dat-bi/ext-vbook/main/anh-bia/1.png',
                description: null,
                host: "https://truyenngontinh.net"
            })
        })

        var next = $.Q(doc, 'span.page-numbers.current + a').text();
        if (next) return Response.success(data, next);

        return Response.success(data);
    }
    return null;
}
