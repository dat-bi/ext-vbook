function execute(url) {
    var doc = Http.get(url).html();
    if (doc) {
        var txt = doc.select(".chapter-content").html();
        return Response.success(txt.replace(/<br>|\\n/g,"<br><br>"));
    }
    return null;
}