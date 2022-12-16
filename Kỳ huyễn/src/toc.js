// function execute(url) {
//     var doc = Http.get(url).html();
//     if (doc) {
//         doc.select("div.tab-content-1").remove();
//         var el = doc.select(".tab-chap .chapters ul li a");
//         var list = [];
//         for (var i = 0; i < el.size(); i++) {
//             var e = el.get(i);
//             list.push({
//                 name: e.text(),
//                 url: e.attr("href").trim(),
//                 host: "https://kyhuyen.com"
//             });
//         }
//         return Response.success(list);
//     }
//     return null;
// }
// function execute(url) {
//     let response = fetch(url);
//     if (response.ok) {
//         let doc = response.html();
//         doc.select("div.tab-content-1").remove();
//         var el = doc.select(".tab-chap .chapters ul li a");
//         var list = [];
//         for (var i = 0; i < el.size(); i++) {
//             var e = el.get(i);
//             list.push({
//                 name: e.text(),
//                 url: e.attr("href"),
//                 host: "https://kyhuyen.com"
//             });
//         }return Response.success(list);
//     }
//     return null;
// }
function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        doc.select("div.tab-content-1").remove();

        let list = [];
        doc.select(".tab-chap .chapters ul li a").forEach(e => list.push({
                name: e.text(),
                url: e.attr("href").trim(),
                host: "https://kyhuyen.com"
        }));
        return Response.success(list);

    }
    return null;
}