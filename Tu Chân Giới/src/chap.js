function execute(url) {
    var doc = Http.get(url).html();
    if (doc) {
        var txt = doc.select("#noidungtruyen").html();
        return Response.success(txt.replace(/<br\s*\/?>|\n/g,"<br><br>"));
    }
    return null;
}