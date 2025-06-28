load('config.js');

function execute(url) {
    if (url.slice(-1) !== "/") url = url + "/";
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL)
    console.log(url)
    var response = fetch(url);
    let genres = [];
    if (response.ok) {
        var doc = response.html();
        let author = doc.select('a[rel="tag"]').first();
        let suggests = [
            {
                title: "Truyện cùng tác giả:",
                input: author.attr("href"),
                script: "gen.js"
            }
        ];
        doc.select('a[rel="tag"]').first().remove();
        let tag = doc.select('a[rel="tag"]');
        tag.forEach(e => {
            genres.push({
                title: e.text(),
                input: e.attr("href"),
                script: "gen.js"
            })
        })
        let gen = doc.select('a[rel="category tag"]');
        gen.forEach(e => {
            genres.push({
                title: e.text(),
                input: e.attr("href"),
                script: "gen.js"
            })
        })
        return Response.success({
            name: doc.select("h1").text(),
            cover: "https://i.imgur.com/5BdXa90.png",
            author:  author.text(),
            description: 'Nghiêm cấm trẻ em dưới 18 tuổi',
            genres: genres,
            suggests: suggests,
            host: BASE_URL
        });
    }
    return null;
}
