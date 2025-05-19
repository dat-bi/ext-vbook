load('config.js')
function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let genres = [];
        doc.select(".space-x-4.space-y-2 a").forEach(e => {
            genres.push({
                title: e.text(),
                input: BASE_URL + e.attr("href"),
                script: "gen.js"
            });
        });
        return Response.success({
            name: doc.select("h1.mb-2").text(),
            cover: doc.select("a img.mx-auto").attr("src"),
            author: doc.select("h1.mb-2 + .mb-6").first().text(),
            genres: genres,
            description: doc.select("#synopsis").html()
        })
    }
    return null;
}
