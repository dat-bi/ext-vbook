function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let host = "https://43zw.cc"
        let doc = response.html('gbk');
        const data = [];
		doc.select(".xs_phb.zxgx .ph_list li").forEach(e => {
            data.push({
                name: e.select("a").first().text(),
                link: host+ e.select("a").first().attr("href"),
                cover: 'https://43zw.cc/files/article/image/36/36282/36282s.jpg',
                description: null,
                host: host
            })
        });

        return Response.success(data)
    }
    return null;
}
// function execute(url, page) {
//     if (!page) page = '1';
//     if(url.slice(-1) !== "/")
//         url = url + "/";
//     let response = fetch(url + "page_" + page + ".html");
//     if (response.ok) {
//         let doc = response.html();
//         var next = doc.select(".pages li a").last().attr("href").split(/[/ ]+/).pop().replace("page_","").replace(".html","");
//         const data = [];
// 		doc.select("#sitebox dl").forEach(e => {
//             data.push({
//                 name: e.select("h3 a").first().text().replace("《","").replace("》",""),
//                 link: e.select("a").first().attr("href"),
//                 cover: "https://www.31bz.org" + e.select("img").first().attr("data-original"),
//                 description: e.select(".book_other").get(1).text(),
//                 host: "https://www.31bz.org"
//             })
//         });

//         return Response.success(data, next)
//     }
//     return null;
// }