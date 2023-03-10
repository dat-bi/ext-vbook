function execute(url) {
    let response = fetch(url);

    if (response.ok) {
        let doc = response.html();
        let htm = doc.select("body > section > div.content-wrap > div > article").html();
        htm = htm.replace(/\&nbsp;/g, "");
        return Response.success(htm.replace(/<br\s*\/?>|\n/g,"<br><br>"));
    }
    return null;
}