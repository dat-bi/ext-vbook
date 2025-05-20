function execute(url) {

    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let htm = doc.select("#chapter-content");
        htm.select("h2").remove();
        return Response.success(htm);
    }
    return null;
}