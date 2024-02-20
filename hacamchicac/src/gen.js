load('config.js');
function execute(url) {
    let response = fetch(BASE_URL + url );
    if (response.ok) {
        let doc = response.html();
        let data = [];
        doc.select(" .archive-grid-post").forEach(e => {
            let coverImg = e.select("img").first().attr("src");
            data.push({
                name: e.select("a").first().text().replace(/\| Chap \d+/g,""),
                link: e.select("a").attr("href"),
                cover: coverImg,
                description: null,
                host: BASE_URL
            });
        });
        return Response.success(data);
    }
    return null;
}