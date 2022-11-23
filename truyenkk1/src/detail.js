function execute(url) {
    var doc = Http.get(url + "/").html()
    //var infos = doc.select("#thong_tin tr")
    //var author = infos[0].select("th").text()
    //var otherName = infos[1].select("th").text()
    //var ongoing = infos[2].select("th").text()
    var genre = String(doc.select(".row .col-lg-9 .text-center span")).replace(/<[^>]+>/g,'').replace(/\n/g,', ')
    if(genre.indexOf('Truyện Tranh')!=-1)
        type = "comic"
    else
        type = "novel"
    return Response.success({
        name : doc.select("h1.crop-text-1").text(),
        cover : doc.select(".row .book3d img").attr("data-src"),
        host : "https://truyenkkz.com",
        author : "",
        description : doc.select("#gioi_thieu").text(),
        detail : "Genre: " + genre,
        type : type
    });
}