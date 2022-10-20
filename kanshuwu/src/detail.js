function execute(url) {
    let response = fetch(url);
    if (response.ok) {

        let doc = response.html();
        let coverImg = doc.select("img").first().attr("data-original");
        console.log(coverImg)
        if (coverImg.startsWith("/")) {
            coverImg = "http://www.kanshuwu.org" + coverImg;
        }
        let author = doc.select("#info p").first().text();
        return Response.success({
            name: doc.select("#info > h1").text(),
            cover: coverImg,
            author: author,
            description: doc.select("#intro").text(),
            detail: "作者：" + author + "<br>" +doc.select("#info .hidden-xs").last().text(),
            host: "http://www.kanshuwu.org"
        });
    }
    return null;
}