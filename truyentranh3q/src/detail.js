load('config.js');
function execute(url) {
    url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL)
    const doc = Http.get(url).html()
    var coverImg = doc.select(".book_avatar img").first().attr("src");
    return Response.success({
        name: doc.select(".book_other h1").first().text(),
        cover: BASE_URL + coverImg,
        description: doc.select(".story-detail-info").html(),
        detail: doc.select(".list01").html(),
        host: BASE_URL,
        ongoing: true
    });
}