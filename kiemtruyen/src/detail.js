function execute(url) {
    var doc = Http.get(url).html();
    // const host = "https://kiemtruyen.com"
    if (doc) {
        return Response.success({
            name: doc.select(".prefix-info > h1").text(),
            cover:"https://kiemtruyen.com" +  doc.select("#content > div > div:nth-child(1) > div.row > div:nth-child(1) > img").attr("src"),
            host: "https://kiemtruyen.com",
            author: null,
            description: doc.select("#content > div > ul > li > div:nth-child(1)").html(),
            detail: doc.select("#content > div > div:nth-child(1) > div.row > div:nth-child(2)").text(),
            ongoing: null
        });
    }
    return null;
}