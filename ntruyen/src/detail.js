function execute(url) {
    // var browser = Engine.newBrowser();
    // var doc = browser.launch(url, 5000);
    // browser.close()
    let response = fetch(url)
    let doc = response.html()
    return Response.success({
        name : doc.select(".story-title h1").text(),
        cover : doc.select(".cover img").attr("src"),
        host : "https://ntruyen.vn",
        author : doc.select(".story-title span").text(),
        description : doc.select(".story-main > div.flexbox > div.story-info > div.genres").html() +"<br>"+ doc.select(".description").text(),
    });
}