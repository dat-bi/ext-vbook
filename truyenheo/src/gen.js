load('libs.js');
load('config.js');

function execute(url, page) {
    page = page || '1';
    var newUrl = String.format(BASE_URL + url + (page == '1' ? '/' : '/page/{0}/'), page);
    var response = fetch(newUrl);
    if (response.ok) {
        var doc = response.html();
        var data = [];

        var elems = $.QA(doc, '.noibat');
        if (!elems.length) return Response.error(url);

        elems.forEach(function(e) {
            var name = $.Q(e, 'a > strong').text();
            if (name == '') return;
            data.push({
                name: name,
                link: $.Q(e, 'a').attr('href'),
                cover:  "https://i.imgur.com/5BdXa90.png",
                description: $.Q(e, 'span').text(),
                host: BASE_URL
            })
        })

        var next = $.Q(doc, 'span.page-numbers.current + a').text();
        if (next) return Response.success(data, next);

        return Response.success(data);
    }
    return null;
}

// https://stackoverflow.com/a/1527820
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
