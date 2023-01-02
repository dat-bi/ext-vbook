function execute(url) {
    let response = fetch(url.replace('sj.downbook.cc','downbook.cc'));
    if (response.ok) {
        let doc = response.html('gbk');
        let cover  = doc.select("#page > div.cenl > div.cl1 > a > img").attr("src")
        if (cover.length === 0){
            cover = "https://raw.githubusercontent.com/dat-bi/ext-vbook/main/anh-bia/1.png"
        }
        return Response.success({
            name: doc.select("#page > div.cenl > div.cl1 > div > h1").text(),
            cover: cover,
            author: null,
            description: doc.select("#page > div.cenl > div.cl1 > ul").html() + "<br>" +doc.select("#page > div.cenl > div.cl2 > div > p").html(),
            detail: null
        });
    }
    return null;
}