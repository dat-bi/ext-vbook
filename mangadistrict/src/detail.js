load('config.js');
function execute(url) {
    url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL)
    var response = fetch(url);
    let genres = [];
    if (response.ok) {
        var doc = response.html();
        let author = doc.select('.author-content').first();
        let tag = doc.select('.tags-content a');
        tag.forEach(e => {
            genres.push({
                title: e.text(),
                input: e.attr("href").replace(BASE_URL, ""),
                script: "gen.js"
            })
        })
        return Response.success({
            name: doc.select("h1").text(),
            cover: doc.select(".summary_image img.img-responsive").attr("src"),
            author:  author.text(),
            description: doc.select("div.summary__content").html(),
            genres: genres,
            host: BASE_URL
        });
    }
    return null;
}