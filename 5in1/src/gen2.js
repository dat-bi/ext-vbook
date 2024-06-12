load('libs.js');
function execute(url, page) {
    if (!page) page = 1;
    if (url.includes("qidian")) {
        url = url.replace(/https:\/\/www\.qidian\.com/g, "");
    }
    let host = 'https://www.qidian.com';
    url = (host + url).formatUnicorn({
        page: page || 1,
    });
    if (url.slice(-1) !== "/") url = url + "/";
    var browser = Engine.newBrowser() // Khởi tạo browser
    let doc = browser.launch(url, 5000) // Mở trang web với timeout, trả về Document object
    browser.close() // Đóng browser khi đã xử lý xong
    // let response = fetch(url);
    // if (response.ok) {
    //     let doc = response.html();
        let data = [];

        let elems = $.QA(doc, '#book-img-text > ul > li');
        if (!elems.length) {
            let elems = $.QA(doc, '#rank-view-list > div > ul > li');
            if (!elems.length) {
                return null
            }
        }
        elems.forEach(function (e, index) {
            let i = (page - 1) * 20 + index + 1;
            let link = $.Q(e, '.book-mid-info h2 a').attr('href').mayBeFillHost(host)
            let newLink = STVHOST + "/truyen/qidian/1/" + getLink(link) + "/";
            data.push({
                name: "<" + i + ">" + $.Q(e, '.book-mid-info h2 a').text(),
                link: newLink,
                cover: $.Q(e, 'div a img').attr('src').mayBeFillHost(host),
                description: $.Q(e, '.book-mid-info p.update a').text().replace('最新更新', '').replace(/.*?/g,"").trim()
            })
        })
        let next = page* 1 + 1;
        return Response.success(data, next);
    // }
    // return null;
}