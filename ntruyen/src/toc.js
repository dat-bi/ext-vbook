load('config.js');
function execute(url) {
    let apiUrl = buildApiUrl(url, BASE_URL);
    if (!apiUrl) return null;
    var listchapter = []
    let response = fetch(apiUrl)
    if (!response.ok) return null
    let json = JSON.parse(response.text())
    let chapters = json.chapters || []
    chapters.forEach(e => listchapter.push({
        name: e.name,
        url: "/doc-truyen/" + e.slug + "-" + e.id,
        host: BASE_URL
    }))

    return Response.success(listchapter)
}

function buildApiUrl(url, baseUrl) {
    if (!url) return null;
    if (url.indexOf("api.ntruyen.biz/novels/") >= 0) return url;
    let normalized = url;
    if (normalized.indexOf("http") !== 0) {
        normalized = baseUrl + normalized;
    }
    normalized = normalized.replace(
        /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img,
        BASE_URL
    );
    let response = fetch(normalized);
    if (!response.ok) return null;
    let html = response.text();
    let storyId = extractStoryId(html);
    if (!storyId) return null;
    return "https://api.ntruyen.biz/novels/" + storyId + "/chapters?page=1";
}

function extractStoryId(html) {
    let match = html.match(/"data":\{"id":(\d+),/);
    return match ? match[1] : null;
}
