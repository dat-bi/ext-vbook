function execute(url) {
    let data  ="";
    let part1 = url.replace("http://www.yikushan.com", "").replace('.html','');
    var next = part1;
    while (next.includes(part1)) {

        let response = fetch("http://www.yikushan.com" + next+ ".html");
        if (response.ok) {
            let doc = response.html();
            doc.select("#play").remove();
            doc.select(".report").remove();
            // doc.select('#play')
            next = doc.select(".bottem1 > a:nth-child(3)").first().attr("href").replace('.html','');
            let htm = doc.select("#booktxt").html();
            data = data + htm;
        } else {
            break;
        }
    }
    if (data) {
        data =data.replace(/<p> 正文完。 <\/p>/g,'')
        .replace(/&(nbsp|amp|quot|lt|gt|bp|emsp);/g, "")
                    .replace('支持.\\^完*本*神*站*\\^.把本站分享那些需要的小伙伴！找不到书请留言！','');
        return Response.success(data);
    }
    return null;
}