function execute(url, page) {
    if(!page){
    var response = fetch("https://www.zhenhunxiaoshuo.com" + url);
    } else {
    response = fetch("https://www.zhenhunxiaoshuo.com" + page);
    }
    if (response.ok) {
        let doc = response.html();
        const data = [];
        let next = doc.select("div.content-wrap > div.content > article > table:nth-child(2) > tbody > tr th a").last().attr("href")
        let el = doc.select(".content > article > table:nth-child(1) > tbody > tr +tr")
        for (var i = 0; i < 10; i++) {
            var e = el.get(i);
            data.push({
                name: e.text(),
                link: "https://www.zhenhunxiaoshuo.com" + e.select("a").attr("href"),
                cover: "https://raw.githubusercontent.com/dat-bi/ext-vbook/main/anh-bia/1.png",
                description: e.select("td").last().text(),
            })
        };


        return Response.success(data, next)
    }
    return null;
}