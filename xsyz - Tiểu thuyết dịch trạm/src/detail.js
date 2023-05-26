function execute(url) {
    let response = fetch(url);
    if (response.ok) {

        let doc = response.html();
        let coverImg = doc.select(".item > a > img").first().attr("src");
        console.log(coverImg)
        if (coverImg.startsWith("/")) {
            coverImg = "https://www.xsyz.cc" + coverImg;
        }
        let author = doc.select("div.item > div > p:nth-child(3) > a").first().text();
        return Response.success({
            name: doc.select(".item > div > h3 > a").text(),
            cover: coverImg,
            author: author,
            description: doc.select(".des.bb").first().text(),
            detail: null,
            host: "https://www.xsyz.cc"
        });
    }
    return null;
}