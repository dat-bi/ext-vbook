load('config.js');

function execute(url, page) {
    if (!page) page = '1';
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    let currentUrl = BASE_URL + url +"&page=" +  page;
    console.log(currentUrl);
    let response = fetch(currentUrl);

    if (response.ok) {
        let doc = response.html();
        const data = [];
        doc.select(".index-content li").forEach(e => {
            let a = e.select("a").first();
            let cover = a.select("img").attr("data-src");

            data.push({
                name: e.select(".dx-title").text().replace(e.select(".dx-title span").text(), "").trim(),
                link: a.attr("href"),
                cover: "https://base64-image.luhanhgia09.workers.dev/proxy?url=" + cover,
                host: BASE_URL
            });
        });

        let next = (parseInt(page) + 1).toString();
        return Response.success(data, next);
    }
    return null;
}
