function execute(url) {
    url = url.replace('www.','wap.')
    // var browser = Engine.newBrowser();
    // browser.setUserAgent(UserAgent.android());
    let data  ="";
    let part1 = url.replace("https://wap.jhssd.com", "").replace('.html','');
    var next = part1;
    while (next.includes(part1)) {
        let response = fetch("https://wap.jhssd.com" + next +".html", {
            headers: {
                'user-agent': UserAgent.android()
            }
        });
        if (response.ok) {
        let doc = response.html();
            next = doc.select("#pb_next").attr("href").replace('.html','');
            console.log(next)
            let htm = doc.select("#nr1").html();
            // console.log(htm)
            data = data + htm;
        } else {
            break;
        }
    }
    if (data) {
        var data1 = data.replace(/&(nbsp|amp|quot|lt|gt|bp|emsp);/g, "")
        .replace(/<a(.*?)<\/a>/g,'').replace(/\s|\n/g,'')
        .replace(/<div>.*?<\/div>/g,'')
        .replace(/\(本章未完，点击下一页精彩继续\)/g,'')
        .replace(/<br><br>为您提供.*?最新章节，请务必保存好书签！<br><br>.*?https:\/\/wap\.jhssd\.com.*?<br>/g,'');
   
        return Response.success(data1);
    }
    return null;
}