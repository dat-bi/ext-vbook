function execute(url , page) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        var el = doc.select(".span9 > div > div.last-5 > div:nth-child(1) > a").attr("href");
        let chap = el.match(/chuong-\d+/g)[0].match(/\d+/g)[0]
        console.log(chap)
        var list = [];
        for (var i = 1; i <= chap; i++) {
            list.push({
                name: "Chương " + i,
                url: url + "/chuong-" + i,
                host: "https://tuchangioi.net"
            });
        }
        return Response.success(list);
    }
    return null;
}