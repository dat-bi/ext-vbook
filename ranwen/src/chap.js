function execute(url) {
    url = url.replace('m.ranwen.la', 'www.ranwen.la');
    let response = fetch(url);

    if (response.ok) {
        let doc = response.html();
        doc.select("#device").remove()
        let htm = doc.select("#content").html();
        htm = htm.replace(/\&nbsp;/g, "");
        return Response.success(htm.replace(/<br\s*\/?>|\n/g,"<br><br>"));
    }
    return null;
}