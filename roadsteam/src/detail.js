load('config.js');
function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    console.log(url)
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let coverImg = doc.select(".summary_image img").first().attr("src");
        return Response.success({
            name: doc.select(".post-title > h1").first().text(),
            cover: coverImg,
            author: null,
            description: doc.select(".post-content").first().html()  + doc.select(".summary__content ").first().html()
        });
    }
    return null;
}