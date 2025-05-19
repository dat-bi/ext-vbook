function execute(url) {

    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        htm.select("h2").remove();
        let htm = doc.select("#chapter-content");
        return Response.success(htm);
    }
    return null;
}