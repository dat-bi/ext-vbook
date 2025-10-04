load('config.js');

function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    let response = fetch(url + "/");
    if (response.ok) {
        let doc = response.html();
        let chapters = [];
        let el = doc.select(".menu-list")
        el.select("li a").forEach(e => {
            chapters.push({
                name: e.text(),
                url: e.attr("href"),
                host: BASE_URL
            })
        });
        return Response.success(chapters);
    }
    return null;
}
