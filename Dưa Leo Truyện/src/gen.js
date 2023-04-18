function execute(url, page) {
    if (!page) page = 1;
    let response = fetch("https://dualeotruyenhot.com" + url + "/page=" + page);
    if (response.ok) {
        let doc = response.html();
        let next = page + 1;
        let data = [];
        doc.select("div.box_list .li_truyen").forEach(e => {
            let coverImg = e.select(".img img").first().attr("data-src");
            data.push({
                name: e.select(".name").first().text(),
                link: e.select("a").first().attr("href"),
                cover: coverImg,
                description: e.select(".chap_name").first().text(),
                host: "https://dualeotruyenhot.com/"
            });
        });

        return Response.success(data, next);
    }

    return null;
}