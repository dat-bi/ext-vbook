function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let htm = doc.select("#content").html();
        return Response.success(htm.replace(/<br\s*\/?>|\n/g,"<br><br>"));
    }
    return null;
}
