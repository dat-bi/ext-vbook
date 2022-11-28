// function execute(url) {
    // if (!page) page = '1';
        //     var docHtml = Http.post("https://truyenaudiocvv.com/api/chapters").params({
        //             manga_id:  99029,
        //             mangaSlug: "con-duong-ba-chu",
        //             page: 2,
        //             voice: 0
        // }).html()
        // console.log(docHtml)
    // let response = fetch("https://truyenaudiocvv.com/api/chapters",{
    //     method : "POST",
    //     queries : {
    //         manga_id:  99029,
    //         mangaSlug: "con-duong-ba-chu",
    //         page: 2,
    //         voice: 0
    //     }
    // }).html();

    // console.log(response)
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
    // return null;
    
// }
function execute(url) {
    var host = "https://truyenaudiocvv.com/"
    let mangaSlug = url.replace("https://truyenaudiocvv.com/","")
    // var doc = Http.get(url).html();
    // var url = url + "/listen?i=0"
    // var doc = Http.get(url).html();
    // var browser = Engine.newBrowser();
    // browser.setUserAgent(UserAgent.android());
    // var doc = browser.launch(url, 4000);
    // var el =doc.select("#ppp > script:nth-child(4)") + ""
    // el = el.match(/\"Điền Số Thứ Tự Chương 1 -> (.*?)\"/g)[0].replace("\"Điền Số Thứ Tự Chương 1 -> ","").replace("\"","")
    // browser.close()
    // if (true) {
        // var el = doc.select(".list-overview > div > div.item-value > a").last().attr("href")
        // el = el.match(/i\=\d+/g)[0].match(/\d+/g)[0];
        var list = [];
        for (var i = 0,j = 1; i <= 100; i++, j++) {
            list.push({
                name: "Chương: " + j,
                url: host + mangaSlug + "/listen?i=" + i,
                host: host
            });
        }
        return Response.success(list);
    // }
    // return null;
}