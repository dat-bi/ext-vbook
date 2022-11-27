function execute(url) {
    var doc = Http.get(url).html();
    var pageLength = doc.select("#pagination > span").length - 2
    if (pageLength > 10){
        pageLength = doc.select("#pagination > span:nth-child(14) > a").text()
    }

    if (doc) {
        var list = [];
        for (var i = 1; i <= pageLength; i++) {
            list.push(url + "?page=" + i);
        }
        return Response.success(list);
    }

    return null;
}