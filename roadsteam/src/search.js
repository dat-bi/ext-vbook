load('config.js');
function execute(key, page) {
    if (!page) page = '1';
    key = encodeURIComponent(key)
    let response = fetch(BASE_URL + "/page/" + page + "/?s=" + key + "&post_type=wp-manga");

    if (response.ok) {
        let doc = response.html();
        let data = [];
        let next = (parseInt(page) + 1).toString()
        doc.select(".tab-content-wrap .c-tabs-item__content").forEach(e => {
            let coverImg = e.select(".tab-thumb img").attr("src");
            data.push({
                name: e.select(".tab-thumb a").attr("title"),
                link: e.select(".tab-thumb a").attr("href"),
                cover: coverImg,
                description: e.select(".chapter").first().text(),
                host: BASE_URL
            });
        });

        return Response.success(data, next);
    }
    return null;
}