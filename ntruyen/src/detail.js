function execute(url) {
    var browser = Engine.newBrowser();
    var doc = browser.launch(url, 5000);
    browser.close()
    return Response.success({
        name : doc.select(".story-title h1").text(),
        cover : doc.select(".cover img").attr("src"),
        host : "https://ntruyen.vn",
        author : doc.select(".story-title span").text(),
        description : doc.select(".description").text(),
    });
}