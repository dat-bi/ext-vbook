function execute(url) {
    // var host = "https://truyenaudiocvv.com/"
    // let mangaSlug = url.replace("https://truyenaudiocvv.com/","")
    // var doc = Http.get(url).html();
    // var url = url + "/listen?i=0"
    // var doc = Http.get(url).html();
    sleep(1000)
    let response = fetch(url)
    let doc =response.html()
    let last = doc.select('.item-value > a').last().attr("href")
    console.log(last)
    let el = last.split("i=")[1]
    var list = [];
    for (var i = 0,j = 1; i <= el; i++, j++) {
        list.push({
            name: "Chương: " + j,
            url: url + "/listen?i=" + i
        });
    }
    // var browser = Engine.newBrowser();
    // browser.setUserAgent(UserAgent.android());
    // var doc = browser.launch(url, 5000);
    // console.log(doc.select("body"))
    // var el =doc.select("#ppp > script:nth-child(4)") + ""
    // el = el.match(/\"Điền Số Thứ Tự Chương 1 -> (.*?)\"/g)[0].replace("\"Điền Số Thứ Tự Chương 1 -> ","").replace("\"","")
    // browser.close()
        // var el = doc.select(".list-overview > div > div.item-value > a").last().attr("href")
        // el = el.match(/i\=\d+/g)[0].match(/\d+/g)[0];

    return Response.success(list);
}