function execute(key, page) {
    if (!page) page = '1';
    key = encodeURIComponent(key)
    let response = fetch(BASE_URL + "/tim-kiem.html?key="+key);

    if (response.ok) {
        let doc = response.html();
        let next =  doc.select("div.page_redirect .active + a").attr("href");
        let data = [];
        doc.select("div.box_list .li_truyen").forEach(e => {
            let coverImg = e.select(".img img").first().attr("data-src");
            data.push({
                name: e.select(".name").first().text(),
                link: e.select("a").first().attr("href"),
                cover: coverImg,
                description: e.select(".chap_name").first().text(),
                host: BASE_URL
            });
        });

        return Response.success(data, next);
    }
    return null;
}