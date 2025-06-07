function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        var doc = response.html()
        let data
        data = doc.select("#read-content")
        if (data.html().length < 100) {
            data = doc.select("#chapter-content")
        }
        data.select(".slide").remove()
        data = cleanHtml(data.html());
        return Response.success(data);
    }
    return null;
}
function cleanHtml(htm) {
  return htm
            .replace(/·/g, '')
            .replace(/&nbsp;/gi, '')
            .replace(/<p>\s*(?:&nbsp;)?\s*<\/p>/gi, '')
            .replace(/<\/p>\s*<p[^>]*>/gi, '<br>')
}