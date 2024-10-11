load('libs.js');
load('config.js')
function execute(url, page) {
    // https://m.qidian.com/majax/rank/reclist?gender=male&pageNum=2&_csrfToken=VGcimHqXEuhHG54BcVuOK2ho1WukStoalTmFIRZ6
    // https://m.qidian.com/majax/rank/yuepiaolist?gender=male&pageNum=1&catId=21&yearmonth=202401&_csrfToken=VGcimHqXEuhHG54BcVuOK2ho1WukStoalTmFIRZ6
    // url = `https://m.qidian.com/majax${url}list?gender=male&pageNum=${page}`
    if (!page) {
        page = 1;
        // var browser = Engine.newBrowser()
        // browser.launch("https://my.qidian.com/author/9639927/", 6000)
        // let url1 = browser.urls()
        // browser.close()
        // var _csrfToken = url1.match(/_csrfToken(.*?)\\u0026/g)[0].replace("\\u0026", "").replace("\\u003d", "=")
        // log(_csrfToken)
        
        
        var response = fetch(`https://m.qidian.com/majax/${url}list?gender=male&pageNum=1&${get_csrfToken()}`);

        // var _csrfToken = `https://m.qidian.com/majax/${url}list?pageNum=1&_csrfToken=TyPFF7zEkSUdFK5m9p3433RdbHZtJQ1StcSCsW2c`
        // log(_csrfToken)
        // var response = fetch(_csrfToken);
    } else {
        // _csrfToken = page.match(/_csrfToken(.*?)$/)[0]
        response = fetch(page);
    }
    if (response.ok) {
        let json = response.json();
        let data = [];
        log(json.msg)
        let pageNum = (json.data.pageNum + 1).toString()
        log(pageNum)
        let next = `https://m.qidian.com/majax/${url}list?gender=male&pageNum=${pageNum}&${get_csrfToken()}`
        let elems = json.data.records
        elems.forEach(function (e, index) {
            let i = (pageNum - 2) * 20 + index + 1;
            data.push({
                name: "<" + i + ">" + e.bName,
                link: `${STVHOST}/truyen/qidian/1/${e.bid}/`,
                cover: `https://bookcover.yuewen.com/qdbimg/349573/${e.bid}/150.webp`,
                description: e.bAuth + " " + e.rankCnt
            })
        })
        return Response.success(data, next);
    }
    return null;
}
