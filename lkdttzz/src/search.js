function execute(key, page) {
        if (!page) page = '1';
    key = encodeURIComponent(key)
    let response = fetch("https://lkdttzz.com/tim-kiem?q="+key+ "&page=" + page)

    if (response.ok) {
        let doc = response.html();
        let next =  doc.select("div.pagination_wrap > a.paging_item.page_num.current + a").text()
        let data = [];
        doc.select(".container > div > div > div:nth-child(2) > div.card-body > div.row > div").forEach(e => {
            var links = e.select(".thumb_attr.series-title a").first().attr("href")
            let coverImg = "https://mysdy.manga9k.com/covers/"+ links.replace("https://lkdttzz.com/truyen/","") +".jpg"
            data.push({
                name: e.select(".thumb_attr.series-title a").first().text(),
                link: links,
                cover: coverImg,
                description: e.select(".thumb-wrapper.tooltipstered > div.thumb-detail > div > a").first().text(),
                host: "https://lkdttzz.com"
            });
        });

        return Response.success(data, next);
    }
    return null;
}