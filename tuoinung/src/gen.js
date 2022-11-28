load('config.js');
function execute(url, page) {
    if (!page) page = '1';
    const doc = Http.get(BASE_URL + url + '/page/'+ page).html();
    var next = doc.select(".wp-pagenavi a.page.larger").first().text()
    const el = doc.select(".listpost .row .col-md-12")
    size = el.size()
    const data = [];
    for (var i = 0; i < size; i++) {
        var e = el.get(i);
        data.push({
            name: e.select(" .news-desc h2").text().replace('Truyện Sex: ',''),
            link: e.select(".news-desc a").attr("href")+'#gsc.tab=0',
            cover: e.select(".news-image img").attr("src"),
            description: e.select(".desc").text(),
            host: BASE_URL
        })
    }
    return Response.success(data,next)
}