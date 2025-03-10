function execute(url) {
    let urlnew = url.replace(".html","/read/chapters.html")
    var browser = Engine.newBrowser();
    var doc = browser.launch(urlnew, 5000);
        let coverImg = doc.select('.book-thumbnail img').attr("src");
        return Response.success({
            name: doc.select('.book-thumbnail img').attr("alt"),
            cover: "https://truyendocviet.vn" + coverImg,
            author: doc.select(' div.brand-social.mt-4 > div:nth-child(2) > a').first().text(),
            description: doc.select(".tom_tat_truyen").text(),
            host: "https://truyendocviet.vn",
        });
}