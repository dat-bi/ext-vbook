function execute(url, page) {
    var host = 'http://www.60ks.cc';
    if (!page) page = '1';
    var response = fetch(url +page+'.html');
    if (response.ok) {
        let doc = response.html('gbk');
        let next = doc.select("#pagelink").select("strong + a").text();
        const data = [];
        doc.select("#sitebox dl").forEach(e => {

            data.push({
                name: e.select("dd h3 a").first().text(),
                link: e.select("dd h3 a").first().attr("href"),
                cover: e.select("dt > a > img").attr("src"),
                description: null,
                host: host
            })
        });
        return Response.success(data,next)
    }
    return null;
}
