function execute(url) {
    if(url.slice(-1) !== "/")
        url = url + "/";
    let id_chap = url.split("/")[4]
    if( id_chap  !== "undefined"){
        var url  = url.match(/https\:\/\/nhungtruyen.com\/(.*?)\//g)[0]
    }
    var doc = fetch(url).html()
    return Response.success({
        name : doc.select(".text-xl").text() + " - " + doc.select("#book-info span.font-medium.text-center.mb-1").first().text(),
        cover : doc.select("#book-info > div > div > aside > div.flex.flex-col > div > img").attr("src"),
        detail: doc.select("#book-info > div > div > aside > div:nth-child(3) span").html(),
        host : "https://nhungtruyen.com",
        author : doc.select(".flex.items-center.space-x-2.text-sm.text-muted").text() + " - " + doc.select("#book-info > div > div > aside > div.flex.flex-col > span.text-xs.text-center.mb-2").first().text(),
        description : doc.select(".prose.max-w-none").html(),
    })
}