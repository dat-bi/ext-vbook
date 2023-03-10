function execute(url, page) {
    if(!page){
    var response = fetch("https://www.zhenhunxiaoshuo.com" + url);
    } else {
    response = fetch("https://www.zhenhunxiaoshuo.com" + page);
    }
    if (response.ok) {
        let doc = response.html();
        const data = [];
        let next = doc.select("body > section > div.content-wrap > div.content > article > table:nth-child(3) > tbody > tr th a").last().attr("href")
        let el = doc.select("body > section > div.content-wrap > div.content > article > table:nth-child(2) > tbody >tr +tr")
        for (var i = 0; i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.text(),
                link: e.select("a").attr("href"),
                cover: "https://raw.githubusercontent.com/dat-bi/ext-vbook/main/anh-bia/1.png",
                description: e.select("td").last().text(),
                host: "https://www.zhenhunxiaoshuo.com"
            })
        };


        return Response.success(data, next)
    }
    return null;
}