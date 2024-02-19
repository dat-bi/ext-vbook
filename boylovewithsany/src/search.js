load('config.js');
function execute(key, page) {
    if (!page) page = '1';
    key = encodeURIComponent(key)
    let response = fetch(BASE_URL + "/?s="+key);

    if (response.ok) {
        let doc = response.html();
        let data = [];
        doc.select(".animposx > a").forEach(e => {
            let coverImg = e.select("img").attr("data-src");
            data.push({
                name: e.attr("title"),
                link: e.attr("href"),
                cover: coverImg,
                description: e.select(".data .type").first().text(),
                host: BASE_URL
            });
        });

        return Response.success(data);
    }
    return null;
}