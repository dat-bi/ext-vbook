function execute(url) {
    var doc = Http.get(url).html();
    if (doc) {
        var txt = doc.select("#section-content > p").html();
        return Response.success(txt);
    }
    return null;
}