load('config.js');
function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let coverImg = doc.select(".box_info.break > div.box_info_left > div.img > img").first().attr("src");
        return Response.success({
            name: doc.select(".box_info.break > div.box_info_right > h1").first().text(),
            cover: coverImg,
            author: null,
            description: doc.select(".box_info.break > div.box_info_right > div.story-detail-info").html()
        });
    }
    return null;
}