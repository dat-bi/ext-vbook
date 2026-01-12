load('config.js');
function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    console.log(url);
    let response = fetch(url);
    if (!response.ok) return null;
    let html = response.text();
    let storyId = extractStoryId(html);
    if (!storyId) return null;
    let apiBase = "https://api.ntruyen.biz/novels/" + storyId + "/chapters?page=";
    let apiResponse = fetch(apiBase + "1");
    if (!apiResponse.ok) return null;
    let json = JSON.parse(apiResponse.text());
    let totalPages = json.totalPages || 1;
    let data = [];
    for (let i = 1; i <= totalPages; i++) {
        data.push(apiBase + i);
    }
    return Response.success(data);
}

function extractStoryId(html) {
    const normalized = html.replace(/\\"/g, '"');
    const patterns = [
        /"data"\s*:\s*\{"id"\s*:\s*(\d+)/,
        /"novelId"\s*:\s*(\d+)/,
    ];
    for (let i = 0; i < patterns.length; i++) {
        const match = normalized.match(patterns[i]);
        if (match) return match[1];
    }
    return null;
}
