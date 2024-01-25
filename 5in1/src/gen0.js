load('libs.js');
function execute(url, page) {
    if (!page) page = 1;
    // https://m.qidian.com/majax/rank/reclist?gender=male&pageNum=2&_csrfToken=VGcimHqXEuhHG54BcVuOK2ho1WukStoalTmFIRZ6
    // url = `https://m.qidian.com/majax${url}list?gender=male&pageNum=${page}`
    var browser = Engine.newBrowser()
    let doc = browser.launch("https://m.qidian.com/majax/rank/reclist?gender=male&pageNum=2&_csrfToken=VGcimHqXEuhHG54BcVuOK2ho1WukStoalTmFIRZ6", 10000)
    browser.close()
    // let response = fetch("https://m.qidian.com/majax/rank/reclist?gender=male&pageNum=2&_csrfToken=VGcimHqXEuhHG54BcVuOK2ho1WukStoalTmFIRZ6"
        // , {
        //     method: "GET",    // GET, POST, PUT, DELETE, PATCH
        //     headers: {
        //         'user-agent': UserAgent.android(), // set chế độ điện thoại
        //     },
        //     queries: {
        //         "pageNum": page,
        //         // "gender": "male",
        //         "_csrfToken": "VGcimHqXEuhHG54BcVuOK2ho1WukStoalTmFIRZ6"
        //     }
        // }
    // );
    // if (response.ok) {
        let json = doc.json();
        let data = [];
        // let elems = json.data.total
        log(json)
        // if (!elems.length) {
        //     var browser = Engine.newBrowser()
        //     doc = browser.launch(url, 5000)
        //     browser.close()
        // };
        // elems.forEach(function (e, index) {
        //     let i = (page - 1) * 20 + + index + 1;
        //     let link = $.Q(e, '.book-mid-info h2 a').attr('href').mayBeFillHost(host)
        //     let newLink = STVHOST + "truyen/qidian/1/" + getLink(link) + "/";
        //     data.push({
        //         name: "<" + i + ">" + $.Q(e, '.book-mid-info h2 a').text(),
        //         link: newLink,
        //         cover: $.Q(e, 'div a img').attr('src').mayBeFillHost(host),
        //         description: $.Q(e, '.book-mid-info p.update').text().replace('最新更新', '').trim()
        //     })
        // })

        // let next = $.Q(doc, '#rank-view-list .rank-tag', -1).text();
        // // log(next);

        // if (next) next = +next / 20 + 1; // 20 items/page

        // return Response.success(data, next);
    // }
    // return null;
} 