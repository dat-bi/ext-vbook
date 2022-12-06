function execute(url) {
    var response = fetch(url);
    if (response.ok) {
        var doc = response.html("gbk");
        doc.select("font").remove()
        var htm = doc.select("#Content")
        return Response.success(htm);
    }
    return null;
}