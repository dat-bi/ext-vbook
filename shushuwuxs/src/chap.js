function execute(url) {
    url = url.replace('m.shushuwuxs', 'www.shushuwuxs')
    let data = "";
    let part1 = url.replace("https://www.shushuwuxs.com", "").replace('.html', '');
    var next = part1;
    while (next.includes(part1)) {
        let response = fetch("https://www.shushuwuxs.com" + next + ".html");
        if (response.ok) {
            let doc = response.html();
            doc.select("#play").remove();
            doc.select(".report").remove();
            next = doc.select("#pager_next").first().attr("href").replace('.html', '');
            let htm = doc.select("#content").html();
            data = data + htm;
        } else {
            break;
        }
    }
    if (data) {
        data = data.replace(/喜欢暖君请大家收藏(.*?)暖君书书屋小说更新速度全网最快。/g, '')
            .replace(/&(nbsp|amp|quot|lt|gt|bp|emsp);/g, "")
            .replace('支持.\\^完*本*神*站*\\^.把本站分享那些需要的小伙伴！找不到书请留言！', '');
        return Response.success(data);
    }
    return null;
}