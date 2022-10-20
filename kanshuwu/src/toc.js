function execute(url) {
url = url.replace('kanshuwu.org/book/','kanshuwu.org/xiaoshuo/')
let part1 = url.replace("http://www.kanshuwu.org", "")
var next = part1;
console.log(next)
var data = [];
while (next.includes(part1)) {
    let response = fetch("http://www.kanshuwu.org" + next);
    if (response.ok) {
        let doc = response.html();
        next = doc.select('#list > dl > dt:nth-child(1) > div > a:nth-child(3)').attr("href");
        console.log(next)
        let el = doc.select("#content_1 a")
        for (let i = 0;i < el.size(); i++) {
            var e = el.get(i)
            data.push({
                name: e.select("a").text(),
                url:"http://www.kanshuwu.org" + e.attr("href"),
                host: "http://www.kanshuwu.org"
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