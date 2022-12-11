load('libs.js');

function execute(url, page) {
    let host = 'https://www.qidian.com';

    url = (host + url).formatUnicorn({
        page: page || 1,
        year: new Date().getFullYear(),
        month: (new Date().getMonth() + 1).toString().padStart(2, '0')
    });

    // log(url);

    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let data = [];

        let elems = $.QA(doc, '#rank-view-list > div > ul > li');
        if (!elems.length) return null;

        elems.forEach(function(e) {
            let link = $.Q(e, '.book-mid-info h2 a').attr('href').mayBeFillHost(host)
            let newLink = "https://sangtacviet.pro/truyen/qidian/1/" + getLink(link) + "/";
            data.push({
                name: $.Q(e, '.book-mid-info h2 a').text(),
                link: newLink,
                cover: $.Q(e, 'div a img').attr('src').mayBeFillHost(host),
                description: $.Q(e, '.book-mid-info p.update a').text().replace('最新更新', '').trim()
            })
        })

        let next = $.Q(doc, '#rank-view-list .rank-tag', -1).text();
        // log(next);

        if (next) next = +next/20 + 1; // 20 items/page
        
        return Response.success(data, next);
    }
    return null;
}
function getLink(link) {
    const BOOK_ID_REGEX = /(?:book|m)\.qidian\.com\/(?:info|book)\/(\d+)(?:\.html)?/
    let m = link.match(BOOK_ID_REGEX)
    return m && m[1]
}