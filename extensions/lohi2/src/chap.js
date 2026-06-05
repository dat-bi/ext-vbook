function execute(url) {
    var cleanUrl = (url || "").replace(/\?tts=true$/, "");
    let response = fetch(cleanUrl);
    if (!response.ok) return Response.error("Cannot load chapter");

    let doc = response.html();
    doc.select("script, style, noscript, svg, button, nav, header, footer").remove();

    let content = doc.select("article.reader-drop-cap").html();
    if (!content) content = doc.select("article").html();

    if (!content) {
        return Response.error("Chapter content not found");
    }

    content = content
        .replace(/<div[^>]*>/g, "")
        .replace(/<\/div>/g, "")
        .replace(/ class="[^"]*"/g, "")
        .replace(/ data-paragraph-index="[^"]*"/g, "")
        .replace(/&nbsp;/g, " ");

    return Response.success(content);
}
