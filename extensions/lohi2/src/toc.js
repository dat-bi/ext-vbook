var BASE_URL = "https://truyen.lohi2.com";
var API_URL = "https://api.lohi2.com/novel";

function getSlug(url) {
    return (url || "").replace(/\/$/, "").split("/").pop();
}

function execute(url) {
    var slug = getSlug(url);
    var response = fetch(API_URL + "/novels/" + slug + "/chapters?limit=10000&offset=0");
    if (!response.ok) return Response.error("Cannot load TOC");

    var chapters = [];
    response.json().forEach(function(item) {
        var number = item.chapterNumber || item.chapter_number;
        var name = item.titleVi || item.title_vi || ("Chương " + number);
        if (!number || !name) return;

        chapters.push({
            name: name,
            url: BASE_URL + "/truyen/" + slug + "/chuong-" + number,
            host: BASE_URL
        });
    });

    if (chapters.length === 0) {
        return Response.error("No chapters found");
    }

    return Response.success(chapters);
}
