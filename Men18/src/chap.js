function execute(url) {
    var doc = Http.get(url).html();
    doc.select(".aligncenter").remove()
    var el = doc.select("#content-d > div img");
    var data = [];
    for (var i = 0; i < el.size(); i++) {
        var e = el.get(i);
        data.push(e.attr("src").replace(/https:\/\/images2-focus(.*?)url\=/g,""));   
    }
    return Response.success(data);
}