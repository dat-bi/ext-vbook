load('config.js');
function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    console.log(url)
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let coverImg = doc.select(".img-fluid").first().attr("src");
        return Response.success({
            name: doc.select(".card-body h1").first().text(),
            cover: coverImg,
            author: null,
            description: doc.select(".card-body").first().html()
        });
    }
    return null;
}