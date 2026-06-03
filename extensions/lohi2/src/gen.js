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

function getFilter(url) {
    var filter = {};
    var genreMatch = url.match(/[?&]genre=([^&]+)/);
    var ttsMatch = url.match(/[?&]tts=1/);
    if (genreMatch) filter.genre = decodeURIComponent(genreMatch[1].replace(/\+/g, " "));
    if (ttsMatch) filter.tts = true;
    return filter;
}

function execute(url, page) {
    page = page || "1";

    var response = fetch(API_URL + "/novels");
    if (!response.ok) return Response.error("Failed to load novels");

    var novels = response.json();
    var filter = getFilter(url || "");

    if (filter.genre) {
        novels = novels.filter(function(item) {
            return (item.genres || []).some(function(genre) {
                return normalizeText(genre) === normalizeText(filter.genre);
            });
        });
    }
    if (filter.tts) {
        novels = novels.filter(function(item) {
            return item.hasOfficialTts;
        });
    }

    var p = Math.max(parseInt(page, 10) || 1, 1);
    var start = (p - 1) * PAGE_SIZE;
    var data = novels.slice(start, start + PAGE_SIZE).map(mapNovel);
    var nextPage = start + PAGE_SIZE < novels.length ? String(p + 1) : null;

    return Response.success(data, nextPage);
}
