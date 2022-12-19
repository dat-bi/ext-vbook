function execute(url , page) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        var el = doc.select(".chap-list .ip5 a");
        var list = [];
        for (var i = 0; i < el.size(); i++) {
            var e = el.get(i);
            list.push({
                name: e.text(),
                url: e.attr("href"),
                host: "https://tuchangioi.net"
            });
        }return Response.success(list);
    }
    return null;
}