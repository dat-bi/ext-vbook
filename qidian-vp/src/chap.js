function execute(url) {

    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let htm = doc.select("#chapter-content");
        htm.select("h2").remove();
        htm = cleanHtml(htm.html());
        return Response.success(htm);
    }
    return null;
}

function cleanHtml(htm) {
  return htm
            .replace(/·/g, '')
            .replace(/&nbsp;/gi, '')
            .replace(/<p>\s*(?:&nbsp;)?\s*<\/p>/gi, '')
            .replace(/<\/p>\s*<p[^>]*>/gi, '<br>')
            .replace(/<p[^>]*>/gi, '')
            .replace(/<\/p>/gi, '<br>')
            .replace(/\s*style="[^"]*"/g, '')
            .replace(/\r?\n+/g, '<br>')
            .replace(/(<br>\s*)+/gi, '<br>')
            .replace(/\b((?:[\u00C0-\u1EF9a-zA-Z]{1}\.){2,}[\u00C0-\u1EF9a-zA-Z]{1})\b/g, function(s) {
                return s.replace(/\./g, '');
            });
}

