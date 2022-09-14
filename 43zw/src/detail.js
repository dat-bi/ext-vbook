function execute(url) {

    let response = fetch(url);
    if (response.ok) {
        let host = "https://43zw.cc"
        let doc = response.html('gbk');
        let cover = doc.select(".index_qb.fmtj > a > div > div.img > img").attr("data-original");
        let author =  doc.select(".xs_info.xsjs > i > a").first().text();
        let description = doc.select(".xs_introduce");
        return Response.success({
            name: doc.select(".xs_info.xsjs > h2 > a").text(),
            cover: host + cover,
            author: author,
            description: description.text(),
            detail: null,
            host: host
        });
    }
    return null;
}