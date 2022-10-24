function execute(url) {
    url = url.replace('www.','m.')
        if(url.slice(-1) !== "/")
        url = url + "/";
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let coverImg = doc.select(".DivImg img").first().attr("src");
        if (coverImg.startsWith("/")) {
            coverImg = "https://m.123ds.org" + coverImg;
        }
        let author = doc.select(".DivBig > div.js > span:nth-child(1)").first().text();
        return Response.success({
            name: doc.select(".DivBig > a").text(),
            cover: coverImg,
            author: author,
            description: doc.select("#nrjj").text(),
            detail: null,
            host: "https://m.123ds.org"
        });
    }
    return null;
}