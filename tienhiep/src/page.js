function execute(url) {
    var doc = Http.get(url).html();
    if (doc) {
        let pages = [];

        let pagel = doc.select(".page-item a[title='Last Page']").last().attr('href').match(/\d+/g)
        for(var i = 1 ; i <= pagel ; i ++){
            pages.push(url + "?page=" + i )
        }
        return Response.success(pages);
    }

    return null;
}