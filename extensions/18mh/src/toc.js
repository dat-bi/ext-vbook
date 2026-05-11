load('config.js');

function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    let response = fetch(url + "/");
    if (response.ok) {
        let doc = response.html();
        let chapters = [];
        doc.select(".detail-page__catalog-item").forEach(e => {
            let name = e.select(".detail-page__chapter-title").text();
            if (!name) name = e.text();
            chapters.push({
                name: name.trim(),
                url: e.attr("href"),
                host: BASE_URL
            })
        });
        return Response.success(chapters);
    }
    return null;
}
