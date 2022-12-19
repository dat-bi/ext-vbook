function execute(url) {
    var doc = Http.get(url).html();
    if (doc) {
        let pages = [];
        doc.select(".paging > div > ul > li:last-child").remove()
        let pagel = doc.select(".paging > div > ul > li").last().text()
        for(var i = 1 ; i <= pagel ; i ++){
            pages.push(url + "?page=" + i )
        }
        return Response.success(pages);
    }

    return null;
}