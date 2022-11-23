function execute(url) {
    var doc = Http.get(url).html()

    var ongoing = doc.select(".comic-intro-text .comic-stt").text()
    var tags = doc.select(".comic-info > .shadow-box")

    return Response.success({
        name : doc.select(".info-title").text(),
        cover : doc.select(".img-thumbnail").attr("src"),
        host : "https://vcomycs.net",
        author : doc.select(".comic-intro-text span").get(1).text(),
        description : doc.select(".text-justify p").text(),
        ongoing : ongoing.indexOf('Đang tiến hành')!=-1,
        detail : "Other name: "+ doc.select(".comic-intro-text span").first().text() + "<br>"
        + "Author: " + doc.select(".comic-intro-text span").get(1).text() + "<br>"
        + "Illustrator: " + doc.select(".comic-intro-text span").get(2).text() + "<br>"
        + "Status: "+ ongoing + "<br>"
        + "Views: "+ doc.select(".comic-intro-text .badge").text() + "<br>"
        + "Genre: " + tags.toString().replace(/<[^>]+>/g,'').replace(/ \n/g,',').replace(/,|\n/,'')
    });

}

//https://vcomycs.net/truyen-tranh/lai-mot-lan-nua-huong-ve-anh-sang/