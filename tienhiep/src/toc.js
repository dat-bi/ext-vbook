// function execute(url) {
//     url =url.replace("https://www.","https://")
//     var doc = Http.get(url).html();
//         // console.log(doc)
//     if(doc){
//         var el = doc.select("#section-content > ul > li > a");
//         var list = [];
//         for (var i = 0; i < el.size(); i++) {
//             var e = el.get(i);
//             list.push({
//                 name: e.text(),
//                 url: "https://kiemtruyen.com"+ e.attr("href"),
//                 host: "https://kiemtruyen.com/"
//             });
//         }return Response.success(list);
//     }
//         return null

// }

function execute(url , page) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        var el = doc.select(".col-md-9 > div:nth-child(2) > table > tbody tr td a");
        var list = [];
        for (var i = 0; i < el.size(); i++) {
            var e = el.get(i);
            list.push({
                name: e.text(),
                url: e.attr("href"),
                host: "https://tienhiep2.net"
            });
        }return Response.success(list);
    }
    return null;
}