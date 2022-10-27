function execute(url) {
    let response = fetch(url.replace('m.','www.'));

    if (response.ok) {
        let doc = response.html();
        let htm = doc.select("#contents p").html();
        htm = htm.replace(/\&nbsp;/g, "").replace(/\<\a(.*?)<\/a>/g,'');
        return Response.success(htm);
    }
    return null;
}