function execute(url) {
    let response = fetch(url);
    let doc = response.html();
    console.log(doc)
    var author = doc.select("i.cap").attr("onclick").replace(/location=\'\/\?find\=&findinname\=(.*?)\'/g, "$1");
    let des = doc.select(".blk:has(.fa-water) .blk-body").html();
    let _detail = doc.select("#inner > div.container.px-md-4.px-sm-0.px-0 > div:nth-child(5) .blk-body");
    _detail.select("a").remove();
    let suggests = [
        {
            title: "Truyện từ các nguồn khác:",
            input: doc.select("#book_name2").first().text(),
            script: "suggests.js"
        }
    ];
    let data = {
        name: doc.select("#oriname").text(),
        cover: doc.select('meta[property="og:image"]').first().attr("content"),
        author: author || 'Unknow',
        description: des,
        detail: _detail.html().replace(/\n/g, "<br>"),
        ongoing: true,
        host: "STVHOST",
        suggests: suggests,
    }
    return Response.success(data);
}


