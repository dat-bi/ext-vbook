function execute(url) {
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
    return Response.success(list);
}