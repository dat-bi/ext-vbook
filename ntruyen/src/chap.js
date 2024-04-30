function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        var doc = response.html()
        let data
        data = doc.select("#read-content").html()
        return Response.success(data);
    }
    return null;
}