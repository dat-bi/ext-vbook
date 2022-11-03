function execute(url) {
url = url.replace('/kushan/','/index/')
let part1 = url.replace("http://www.yikushan.com", "")
var next = part1;
var data = [];
console.log(next)
while (next.includes(part1)) {
    let response = fetch("http://www.yikushan.com" + next);
    if (response.ok) {
        let doc = response.html();
        next = doc.select('#list > dl > dt:nth-child(1) > div > a:nth-child(3)').attr("href");
        console.log(next)
        let el = doc.select("#content_1 a")
        for (let i = 0;i < el.size(); i++) {
            var e = el.get(i)
            data.push({
                name: e.select("a").text(),
                url:"http://www.yikushan.com" + e.attr("href"),
                host: "http://www.yikushan.com"
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