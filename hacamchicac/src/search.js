load('config.js');
function execute(key, page) {
    if (!page) page = '1';
    key = encodeURIComponent(key)
    //https://hacamchicac.com/page/2/?s=nam
    let response = fetch(`${BASE_URL}/page/${page}/?s=${key}`);
    if (response.ok) {
        let doc = response.html();
        let data = [];
        let e = doc.select(".archive-grid-post").first()
            let coverImg = e.select("img").first().attr("data-src");
            data.push({
                name: e.select("a").first().text().replace(/\| Chap \d+/g,""),
                link: e.select("a").attr("href"),
                cover: coverImg,
                description: null,
                host: BASE_URL
            });
     

        return Response.success(data);
    }
    return null;
}