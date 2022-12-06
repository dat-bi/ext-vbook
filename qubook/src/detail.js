function execute(url) {
    let response = fetch(url.replace('sj.qubook.cc','qubook.cc'));
    if (response.ok) {
        let doc = response.html('gbk');
        let cover  = doc.select("#page > div.ml > div.ml1 > a > img").attr("src"),
        if (cover.length === 0){
            cover = "https://www.downbook.cc/book/UploadPic/2022-12/45khhg5mhu0.jpg"
        }
        return Response.success({
            name: doc.select("#page > div.ml > div.ml1 > h1").text(),
            cover: cover,
            author: doc.select("#page > div.ml > div.ml1 > ul > li:nth-child(4)").text(),
            description: doc.select("#page > div.ml > div.ml2 > div.center").text(),
            detail: doc.select("#page > div.ml > div.ml1 > ul").text(),
            host: "https://qubook.cc"
        });
    }
    return null;
}