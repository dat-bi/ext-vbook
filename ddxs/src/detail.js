function execute(url) {
    let response = fetch(url + "/");
    if (response.ok) {

        let doc = response.html();
        let coverImg = doc.select(".pic img").first().attr("src");
        if (coverImg.startsWith("/")) {
            coverImg = "https://www.ddxs.com" + coverImg;
        }
        return Response.success({
            name: doc.select(".btitle h1").text(),
            cover: coverImg,
            author: doc.select(".btitle i").first().text().replace(/作\s*者：/g, ""),
            description: doc.select(".intro").text(),
            detail: doc.select(".btitle i").html(),
            host: "https://www.ddxs.com"
        });
    }
    return null;
}