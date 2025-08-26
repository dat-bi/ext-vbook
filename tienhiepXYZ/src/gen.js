function execute(url, page) {
    if (!page) page = "1";
    // let response = fetch("https://truyendich.vn/" + url + "?page=" + page);
    let response = fetch("https://truyendich.vn" + url + "?page=" + page);
    if (response.ok) {
        let doc = response.html();
        var el = doc.select(".list .row");
        var novelList = [];
        var next = parseInt(page) + 1;
        for (var i = 0; i < el.size(); i++) {
            var e = el.get(i);
            let link = e.select(".truyen-title a").attr("href")
            let coverImg = link.replace("https://truyendich.vn", "https://truyendich.vn/story-thumb");
            if (coverImg.endsWith('/')) {
                coverImg = coverImg.slice(0, -1);
                coverImg = coverImg + ".jpg"
            }
            novelList.push({
                name: e.select(".truyen-title").text(),
                link: link,
                description: e.select('.author').text(),
                cover: coverImg,
                host: "https://truyendich.vn/",
            });

        }
        return Response.success(novelList, next);
    }
    return null;
}