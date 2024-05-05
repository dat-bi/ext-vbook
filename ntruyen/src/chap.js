function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        var doc = response.html()
        let data
        data = doc.select("#read-content")
        if (data.html().length < 100) {
            data = doc.select("#chapter-content")
        }
        return Response.success(data);
    }
    return null;
}