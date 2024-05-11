load('libs.js');
load('config.js');

function execute(url) {
    url = url.replace('www.ptwxz', 'm.ptwxz.org');
    let cvData ="";
    let part1 = url.replace("http://www.ptwxz.org", "").replace("https://m.ptwxz.org", "").replace(".html","");
    var next = part1;
    while (next.includes(part1)) {
        let response = fetch("http://www.ptwxz.org" + next +".html");
        if (response.ok) {
            let doc = response.html();
            doc.select("p[title]").remove()
            next = doc.select(".next").last().attr("href").replace(".html","");
            let htm = doc.select("#content").html();
            htm = htm.replace(/\&nbsp;/g, "")
                    .replace("小主，这个章节后面还有哦^.^，请点击下一页继续阅读，后面更精彩！","")
                    // .replace(/<p>喜欢.*? 更新速度全网最快。<\/p>/g,"")
            cvData = cvData + htm;
        } else {
            break;
        }
    }
    if (cvData) {
        return Response.success(cvData);
    }
    return null;
}