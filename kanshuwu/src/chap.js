function execute(url) {
    let data  ="";
    let part1 = url.replace("http://www.kanshuwu.org", "").replace('.html','');
    var next = part1;
    while (next.includes(part1)) {

        let response = fetch("http://www.kanshuwu.org" + next +".html");
        if (response.ok) {
            let doc = response.html();
            next = doc.select("#next_url").first().attr("href").replace('.html','');
            let htm = doc.select("#booktxt").html();
            data = data + htm;
        } else {
            break;
        }
    }
    if (data) {
        return Response.success(data.replace('一秒记住.↘看书屋首^发↘.手机用户输入地址：www.kanshuwu.org','').replace('支持.\\^完*本*神*站*\\^.把本站分享那些需要的小伙伴！找不到书请留言！',''));
    }
    return null;
}