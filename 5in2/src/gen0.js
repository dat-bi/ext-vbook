load('libs.js');
load('config.js')
function execute(url, page) {
    if (!page) page = 1;
    let host = 'https://m.qidian.com/';
    url = (host + url).formatUnicorn({
        page: page || 1,
        _csrfToken: get_csrfToken()
    });
    console.log(url)
    let response = fetch(url)
    if (response.ok) {
        let json = response.json();
        let data = [];
        log(json.msg)
        let pageNum = (json.data.pageNum + 1).toString()
        log(pageNum)
        let next = pageNum
        // let next = `https://m.qidian.com/majax/${url}list?gender=male&pageNum=${pageNum}&${_csrfToken}`
        let elems = json.data.records
        elems.forEach(function (e, index) {
            let i = (pageNum - 2) * 20 + index + 1;
            data.push({
                name: "<" + i + ">" + e.bName,
                link: `${STVHOST}/truyen/qidian/1/${e.bid}/`,
                cover: `https://bookcover.yuewen.com/qdbimg/349573/${e.bid}/150.webp`,
                description: `${e.bAuth}- ${e.rankCnt || e.state || ""}`
            })
        })
        return Response.success(data, next);
    }
    return null;
}
