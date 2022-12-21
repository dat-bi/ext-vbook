function execute(url) {
    var doc = fetch(url).html()
    return Response.success({
        name : doc.select(".text-xl").text() + " - " + doc.select("#book-info span.font-medium.text-center.mb-1").first().text(),
        cover : doc.select("#book-info > div > div > aside > div.flex.flex-col > div > img").attr("src"),
        host : "https://nhungtruyen.com",
        author : doc.select(".flex.items-center.space-x-2.text-sm.text-muted").text() + " - " + doc.select("#book-info > div > div > aside > div.flex.flex-col > span.text-xs.text-center.mb-2").first().text(),
        description : doc.select(".prose.max-w-none").html(),
    });
}