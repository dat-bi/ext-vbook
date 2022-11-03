function execute(url) {
// https://m.xyushu5.com/novel/list/74259/1.html
    var bookId = url.replace('https://www.xyushu5.com/read/','')
        .replace('https://m.xyushu5.com/novel/','')
        .replace('.html','')
        .replace('/','');
    console.log('https://m.xyushu5.com/novel/list/'+ bookId + '/1.html')
    let response = fetch('https://m.xyushu5.com/novel/list/'+ bookId + '/1.html');
    if (response.ok) {
        let doc = response.html();
        let el = doc.select("ul li")
        var data = []
        for (let i = 0;i < el.size(); i++) {
            var e = el.get(i)
            data.push({
                name: e.select("a").text(),
                url:"https://m.xyushu5.com" + e.select("a").attr("href"),
                host: "https://m.xyushu5.com"
            })
        }

        return Response.success(data);
    }
    return null;
}