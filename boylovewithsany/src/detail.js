load('config.js');
function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    console.log(url)
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let coverImg = doc.select("#infoarea .thumb > img").first().attr("data-src");
        return Response.success({
            name: doc.select("#infoarea .infox > h1").first().text(),
            cover: coverImg,
            author:  doc.select(".infox .spe span:nth-child(3)").first().text().replace("Tác Giả",""),
            
            description: doc.select(".desc").first().html()
        });
    }
    return null;
}