function execute(url) {
    var doc = Http.get(url).html()
    return Response.success({
        name : doc.select(".w3-container.w3-center.detail-right > h2 > a").text(),
        cover : doc.select(".w3-col.s4.m12.l12.detail-thumbnail > img").attr("src"),
        host : "https://truyenchuth.com",
        author : doc.select(".w3-col.s8.m12.l12.detail-info > ul > li:nth-child(1) > h2").text(),
        description : doc.select(".w3-justify.summary > article").text(),
        detail : doc.select(".w3-col.s8.m12.l12.detail-info > ul > li:nth-child(2) > a").text()
    });
}