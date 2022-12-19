function execute(url, page) {
    let response = fetch("https://docgiaso1.com/"+url);
    if (response.ok) {
        let doc = response.html();
        let next =  doc.select(".pagination").select("li.active + li a").attr("href")
        let data = [];
        doc.select(".item-spc").forEach(e => {
            let coverImg = e.select(".manga-poster img").first().attr("src");
            data.push({
                name: e.select(".manga-name").first().text(),
                link: e.select(".manga-name a").attr("href"),
                cover: coverImg,
                description: e.select(".chapter a").first().text(),
                host: "https://docgiaso1.com/"
            });
        });

        return Response.success(data, next);
    }

    return null;
}