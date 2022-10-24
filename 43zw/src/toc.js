function execute(url) {
    let bookID = url.split("/")[4].replace('.html','')
    var data = [];
    let part1 = bookID + '/all_';
    var next = part1 + '1';
    while (next.includes(part1)) {
        let response = fetch('https://43zw.cc/chapter_43/'+ next + '.html');
        if (response.ok) {
            let doc = response.html('gbk');
            next = doc.select("#xfanyebtn").first().attr("href").replace('.html','');
            console.log(next)
            let el = doc.select(".ph_list").first().select("li a")
            for (let i = 0;i < el.size(); i++) {
                var e = el.get(i);
                data.push({
                    name: e.select("a").text(),
                    url:"https://43zw.cc" + e.attr("href"),
                    host: "https://43zw.cc"
                })
            }
        } else {
            break;
        }
    }
    if (data) {
        return Response.success(data);
    }
    return null;
}