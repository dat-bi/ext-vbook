function execute(url) {
    sleep(1000)
    let response = fetch(url)
    let doc =response.html()
    let last = doc.select('.item-value > a').last().attr("href")
    let el = last.split("i=")[1]
    console.log(el)
    let page = Math.ceil(el/3);
    console.log(page)
    var list = [];
    for (var i = 1; i <= page*3; i += 3) {
        list.push({
            name: "Chương: " + i +"~" +  Math.round(i+2),
            url: url + "/listen?i=" +  Math.round(i-1)
        });
    }
    return Response.success(list);
}