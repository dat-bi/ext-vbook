function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, "https://truyenngontinh.net")
    var response = fetch(url);
    if (response.ok) {
        var doc = response.html();
        let htm = doc.select("body > div.logo2 > div:nth-child(5) p");
        // htm.select("div.bai-viet-box").remove();
        // htm.replace(/style=\"background:#f7f7f7.*?\"/g,"")
        return Response.success(htm);
    }
    return null;
}
