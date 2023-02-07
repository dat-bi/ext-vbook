function execute(url, page) {
    if(!page){page = ""}
    let newUrl = "https://www.mmdaobaobei.com" + url
    var doc = Http.get(newUrl + page).html();
    if (doc) {
        var el = doc.select(".wrap_list > div.list_box > ul li");
        var novelList = [];
        var next = doc.select(".page_box a:contains(下一页)").first().attr("href").replace("./","")
        console.log(next)
        for (var i = 0; i < el.size(); i++) {
            var e = el.get(i);
            novelList.push({
                name: e.select("a").last().text(),
                cover: "https://raw.githubusercontent.com/dat-bi/ext-vbook/main/anh-bia/1.png",
                link: e.select("a").last().attr("href"),
            });
        }
        return Response.success(novelList, next);
    }
    return null;
}