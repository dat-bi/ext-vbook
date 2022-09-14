function execute(url) {
    url = url.replace('.html','')
    let bookID = url.split("/")[4]
    let response = fetch('https://43zw.cc/chapter_1/'+bookID+'/all_1.html');
    if (response.ok) {
        let doc = response.html('gbk');
        let el1 = doc.select(".ph_list").first()
        let el = el1.select("li a")
        const data = [];
        for (let i = 0;i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select("a").text(),
                url:"https://43zw.cc" + e.attr("href"),
                host: "https://43zw.cc"
            })
        }
        return Response.success(data);
    }
    return null;
}