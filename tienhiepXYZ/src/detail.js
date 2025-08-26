function execute(url) {
    if (url.slice(-1) !== "/") url = url + "/";
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let coverImg = url.replace("https://truyendich.vn", "https://truyendich.vn/story-thumb");
        if (coverImg.endsWith('/')) {
            coverImg = coverImg.slice(0, -1);
            coverImg = coverImg + ".jpg"
        }
        var genres = [];
        doc.select('a[itemprop="genre"]').forEach(e => {
            genres.push({
                title: e.text(),
                input: e.attr("href").replace("https://truyendich.vn", ""),
                script: "gen.js"
            });
        });
        console.log(coverImg)
        return Response.success({
            name: doc.select('h3.title').first().text(),
            cover: coverImg,
            author: doc.select('a[itemprop="author"]').first().text(),
            description: doc.select(".desc-text").text(),
            host: "https://truyendich.vn/",
            genres: genres,
        });
    }

    return null;
}