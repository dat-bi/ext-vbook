function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let coverImg = doc.select('meta[property="og:image"]').attr("content");
        console.log(coverImg)
        return Response.success({
            name: doc.select('h1[itemprop="name"] a').first().text(),
            cover: coverImg,
            author: doc.select('a[itemprop="author"]').first().text(),
            description: doc.select(".text-justify").text(),
            host: "https://tienhiep.xyz/",
        });
    }

    return null;
}