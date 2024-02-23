load('config.js');
function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    console.log(url)
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let coverImg = doc.select(".box_info_left .img img").attr("src");
        return Response.success({
            name: doc.select(".box_info_right h1").first().text(),
            cover: coverImg,
            author: null,
            description: doc.select(".txt").first().html()
        });
    }
    return null;
}