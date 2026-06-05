var BASE_URL = "https://truyen.lohi2.com";
var API_URL = "https://api.lohi2.com/novel";
var PAGE_SIZE = 24;

function normalizeText(text) {
    return (text || "").toString().toLowerCase();
}

function mapNovel(item) {
    var genres = item.genres || [];
    var description = [];
    if (item.authorVi) description.push(item.authorVi);
    if (item.totalChapters) description.push(item.totalChapters + " chương");
    if (genres.length > 0) description.push(genres.join(", "));

    return {
        name: item.titleVi || item.titleCn || item.slug,
        link: BASE_URL + "/truyen/" + item.slug,
        cover: item.coverImageUrl || "",
        description: description.join(" • "),
        host: BASE_URL
    };
}

function execute(key, page) {
    page = page || "1";

    var response = fetch(API_URL + "/novels");
    if (!response.ok) return Response.error("Search failed");

    var keyword = normalizeText(key);
    var novels = response.json().filter(function(item) {
        var haystack = [
            item.titleVi,
            item.titleCn,
            item.authorVi,
            item.slug,
            (item.genres || []).join(" ")
        ].join(" ");
        return normalizeText(haystack).indexOf(keyword) >= 0;
    });

    var p = Math.max(parseInt(page, 10) || 1, 1);
    var start = (p - 1) * PAGE_SIZE;
    var data = novels.slice(start, start + PAGE_SIZE).map(mapNovel);
    var nextPage = start + PAGE_SIZE < novels.length ? String(p + 1) : null;

    return Response.success(data, nextPage);
}
