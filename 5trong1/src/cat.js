load('libs.js');
function execute(url, page) {
    var host = 'https://www.qidian.com';

    url = String.format('https://www.qidian.com/all/chanId{0}-page{1}/', url, page);

    let response = fetch(url);

    if (response.ok) {
        let doc = response.html();
        var data = [];

        var elems = $.QA(doc, 'li[data-rid]');
        if (!elems.length) return Response.error(url);

        elems.forEach(function (e) {
            let link = $.Q(e, '.book-mid-info h2 a').attr('href').mayBeFillHost(host)
            let newLink = STVHOST + "truyen/qidian/1/" + getLink(link) + "/";
            data.push({
                name: $.Q(e, '.book-mid-info h2 a').text(),
                cover: newLink,
                link: $.Q(e, '.book-mid-info h2 a').attr('href').mayBeFillHost(host),
                description: $.Q(e, 'p.author').text(),
                host: host
            })
        })

        var next = $.Q(doc, 'a.lbf-pagination-page.lbf-pagination-current').text();
        if (next) next = parseInt(next, 10) + 1;

        return Response.success(data, next.toString());
    }
    return null;
}
function getLink(link) {
    const BOOK_ID_REGEX = /(?:book|m)\.qidian\.com\/(?:info|book)\/(\d+)(?:\.html)?/
    let m = link.match(BOOK_ID_REGEX)
    return m && m[1]
}