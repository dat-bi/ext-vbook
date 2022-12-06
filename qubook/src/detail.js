function execute(url) {
    let response = fetch(url.replace('sj.qubook.cc','qubook.cc'));
    if (response.ok) {
        let doc = response.html('gbk');
        return Response.success({
            name: doc.select("#page > div.ml > div.ml1 > h1").text(),
            cover: doc.select("#page > div.ml > div.ml1 > a > img").attr("src"),
            author: doc.select("#page > div.ml > div.ml1 > ul > li:nth-child(4)").text(),
            description: doc.select("#page > div.ml > div.ml2 > div.center").text(),
            detail: doc.select("#page > div.ml > div.ml1 > ul").text(),
            host: "https://qubook.cc"
        });
    }
    return null;
}