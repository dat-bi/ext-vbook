function execute(url, page) {
    // if (!page) page = '1';
    let response = fetch("https://truyenaudiocvv.com/api/chapters",{
        method : "POST",
        queries : {
            manga_id: 99029,
            mangaSlug : "con-duong-ba-chu",
            paged : 1
        }
    });
    console.log(response)
    // if(response.ok){
    //     let doc = response.html();
    //     // let next = doc.select(".pagination").select("li.active + li").text()
    //     let el = doc.select(".grid-story-item")
    //     let data = [];
    //     el.forEach(e => data.push({
    //         name: e.select("h3 a").first().text(),
    //         link: e.select("h3 a").first().attr("href"),
    //         cover: e.select(".cover img").first().attr("src"),
    //         description: e.select(".metas").first().text(),
    //         host: "https://ntruyen.vn"
    //     }))
    //     return Response.success(data, next)
    // }
    return null;
}
// function execute(url) {
//     let response = fetch(url,{
        
//     });
//     if (response.ok) {
//         let doc = response.html();
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
//     return null;
// }