function execute(key, page) {
    var key = encodeURIComponent(key)
    let response = fetch("https://truyendich.vn/tim-kiem?search=" + key)
    if (response) {
        let doc = response.html();
        var el = doc.select(".list .row");
        var data = [];
        var next = parseInt(page) + 1;
        for (var i = 0; i < el.size(); i++) {
            var e = el.get(i);
            let link = e.select(".truyen-title a").attr("href")
            console.log(link);
            let coverImg = link.replace("https://truyendich.vn", "https://truyendich.vn/story-thumb");
            if (coverImg.endsWith('/')) {
                coverImg = coverImg.slice(0, -1);
                coverImg = coverImg + ".jpg"
            }
            data.push({
                name: e.select(".truyen-title").text(),
                link: link,
                description: e.select('.author').text(),
                cover: coverImg,
                host: "https://truyendich.vn/",
            });
        }
        return Response.success(data);
    }
    return null;
}
