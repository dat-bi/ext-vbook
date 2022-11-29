function execute(url) {
    var doc = Http.get(url).html();
    if (doc) {
        return Response.success({
            name: doc.select(".headline-brd").text(),
            cover: doc.select(".container.content > div > div.col-md-9 > div:nth-child(1) > div.col-md-4 > img").attr("src"),
            host: "https://tienhiep2.net",
            author: doc.select(".headline-left.margin-bottom-30 > ul.list-unstyled.list-inline.blog-info-v2 li a").text(),
            description: doc.select(".headline-left.margin-bottom-30 > p:nth-child(5)").html(),
            detail: doc.select(".container.content > div > div.col-md-9 > div:nth-child(1) > div.col-md-8 > div.headline-left.margin-bottom-30 > ul.list-unstyled.lists-v2.margin-bottom-30").html(),
            ongoing: null
        });
    }
    return null;
}