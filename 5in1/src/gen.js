load('libs.js');
function execute(url, page) {
    if (!page) page = 1;
    let host = 'https://www.qidian.com';
    if (url.includes("Q票榜")) {
        if (time === "2023") {
            return Response.error("bổ sung thêm tháng muốn xem nguyệt phiếu \n ví dụ: let CONFIG_TIME = '5/2023';")
        }
        url = (host + url.replace("Q票榜", "")).formatUnicorn({
            page: page || 1,
            year: time.split("/")[1],
            month: time.split("/")[0].toString().padStart(2, '0')
        });

    } else {
        url = (host + url).formatUnicorn({
            page: page || 1,
            year: new Date().getFullYear(),
            month: (new Date().getMonth() + 1).toString().padStart(2, '0')
        });
    }
    var browser = Engine.newBrowser()
    let doc = browser.launch(url, 5000)
    browser.close()
    // if (response.ok) {
    // let doc = response.html();
    let data = [];
    let elems = $.QA(doc, '#rank-view-list > div > ul > li');
    while (!elems.length) {
        var browser = Engine.newBrowser()
        doc = browser.launch(url, 5000)
        elems = $.QA(doc, '#rank-view-list > div > ul > li');
        browser.close()
    };
    elems.forEach(function (e, index) {
        let i = (page - 1) * 20 + + index + 1;
        let link = $.Q(e, '.book-mid-info h2 a').attr('href').mayBeFillHost(host)
        let newLink = STVHOST + "/truyen/qidian/1/" + getLink(link) + "/";
        data.push({
            name: "<" + i + ">" + $.Q(e, '.book-mid-info h2 a').text(),
            link: newLink,
            cover: $.Q(e, 'div a img').attr('src').mayBeFillHost(host),
            description: $.Q(e, '.book-mid-info p.update').text().replace('最新更新', '').trim()
        })
    })

    let next = $.Q(doc, '#rank-view-list .rank-tag', -1).text();
    // log(next);

    if (next) next = +next / 20 + 1; // 20 items/page

    return Response.success(data, next);
    // }
    // return null;
} 