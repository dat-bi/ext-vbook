load('config.js');
function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    let idMatch = url.match(/\/detail\/(\d+)/);
    let id = idMatch ? idMatch[1] : '';
    let url_cmt = BASE_URL + "/index/commentList?type=1&target_id=" + id;

    var response = fetch(url);
    if (response.ok) {
        var doc = response.html();
        let name = doc.select('.detail-page__title').first().text();
        let author = doc.select('.detail-page__meta-item a[href*="/author/"]').first().text();
        
        let coverEl = doc.select('.detail-page__poster-img').first();
        let cover = coverEl.attr('data-src') || coverEl.attr('src');
        if (cover && cover.indexOf('http') !== 0) {
            cover = BASE_URL + cover;
        }

        let description = doc.select('.detail-intro__text').first().text();

        let genres = [];
        doc.select('.detail-page__tag, .detail-page__meta-item a[href*="/all/"]').forEach(e => {
            let title = e.text().trim();
            if (title) {
                genres.push({
                    title: title,
                    input: e.attr("href"),
                    script: "gen.js"
                });
            }
        });

        let status = "";
        let lastUpdate = "";
        doc.select(".detail-page__meta-item").forEach(e => {
            let text = e.text();
            if (text.includes("连载") || text.includes("完结")) {
                status = text.trim();
            } else if (text.includes("更新")) {
                lastUpdate = text.trim();
            }
        });

        return Response.success({
            name: name,
            cover: "https://base64-image.luhanhgia09.workers.dev/proxy?url=" + cover,
            author: author,
            description: description,
            status: status,
            lastUpdate: lastUpdate,
            ongoing: status.includes("连载"),
            host: BASE_URL,
            genres: genres,
            comment: {
                input: url_cmt,
                script: "comment.js"
            },
        });
    }
    return null;
}