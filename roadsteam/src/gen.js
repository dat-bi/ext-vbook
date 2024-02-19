load('config.js');
function execute(url,page) {
    if (!page) page = '1';
    let response = fetch(BASE_URL + url  + "/page/"+page + "/");
    if (response.ok) {
        let doc = response.html();
        let data = [];
        let next = (parseInt(page) + 1).toString()
        doc.select(".item-default .page-item-detail").forEach(e => {
            let coverImg = e.select("img").attr("src");
            data.push({
                name: e.select(".item-thumb a").attr("title"),
                link: e.select(".item-thumb a").attr("href"),
                cover: coverImg,
                description: e.select(".chapter-item ").first().text(),
                host: BASE_URL
            });

        });
        return Response.success(data, next);
    }
    return null;
}