var BASE_URL = "https://truyen.lohi2.com";
var API_URL = "https://api.lohi2.com/novel";

function getSlug(url) {
    return (url || "").replace(/\/$/, "").split("/").pop();
}

function execute(url) {
    var slug = getSlug(url);
    var response = fetch(API_URL + "/novels/" + slug);
    if (!response.ok) return Response.error("Cannot load detail");

    var item = response.json();
    var page = fetch(BASE_URL + "/truyen/" + slug);
    var description = "";
    if (page.ok) {
        description = page.html().select("meta[name=description]").attr("content") || "";
    }

    var genreLinks = [];
    (item.genres || []).forEach(function(genre) {
        genreLinks.push({
            title: genre,
            input: API_URL + "/novels?genre=" + encodeURIComponent(genre),
            script: "gen.js"
        });
    });

    var suggests = [];
    if (item.authorVi) {
        suggests.push({
            title: "Cùng tác giả: " + item.authorVi,
            input: item.authorVi,
            script: "search.js"
        });
    }

    return Response.success({
        name: item.titleVi || item.titleCn || item.slug,
        cover: item.coverImageUrl || "",
        host: BASE_URL,
        author: item.authorVi || "",
        description: description,
        detail: "Tác giả: " + (item.authorVi || "") +
            "<br>Số chương: " + (item.totalChapters || 0) +
            "<br>Thể loại: " + (item.genres || []).join(", "),
        ongoing: true,
        genres: genreLinks,
        suggests: suggests
    });
}
