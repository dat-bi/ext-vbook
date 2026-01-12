function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        var doc = response.html()
        let data = doc.select("#read-content")
        if (!data || !data.html() || data.html().length < 100) {
            data = doc.select("#chapter-content")
        }
        if (data && data.html() && data.html().length >= 100) {
            data.select(".slide").remove()
            data = cleanHtml(data.html());
            return Response.success(data);
        }
        let nextData = extractNextContent(doc);
        if (nextData) {
            return Response.success(cleanHtml(nextData));
        }
    }
    return Response.error("vào trang nguồn kiểm tra");
}

function extractNextContent(doc) {
    let content = "";
    let regex = /self\.__next_f\.push\(\[1,"((?:\\.|[^"\\])*)"\]\)/g;
    doc.select("script").forEach(e => {
        let script = e.html();
        if (!script || script.indexOf("__next_f") === -1) return;
        let match;
        while ((match = regex.exec(script)) !== null) {
            let raw = match[1];
            if (raw.indexOf("\\u003cbr\\u003e") === -1 && raw.indexOf("<br>") === -1) continue;
            let decoded;
            try {
                decoded = JSON.parse('"' + raw + '"');
            } catch (err) {
                continue;
            }
            if (decoded.length > content.length) {
                content = decoded;
            }
        }
    });
    return content;
}
function cleanHtml(htm) {
  return htm
            .replace(/·/g, '')
            .replace(/&nbsp;/gi, '')
            .replace(/<p>\s*(?:&nbsp;)?\s*<\/p>/gi, '')
            .replace(/<\/p>\s*<p[^>]*>/gi, '<br>')
}
