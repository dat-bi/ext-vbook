load('config.js');
function execute(url) {
    let response = fetch(BASE_URL + url );
    if (response.ok) {
        let doc = response.html();
        let data = [];
        doc.select(" .animepost>.animposx a").forEach(e => {
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