function execute(url) {
    url = url.replace('www.','wap.')
    var browser = Engine.newBrowser();
    browser.setUserAgent(UserAgent.android());
    let data  ="";
    let part1 = url.replace("https://wap.jhssd.com", "").replace('.html','');
    var next = part1;
    while (next.includes(part1)) {
        var doc = browser.launch("https://wap.jhssd.com" + next +".html", 4000);
        if (doc) {
            next = doc.select("#pb_next").attr("href").replace('.html','');
            console.log(next)
            let htm = doc.select(".nr_nr").html();
            data = data + htm;
        } else {
            break;
        }
    }
    browser.close()
    if (data) {
        var data1 = data.replace(/&(nbsp|amp|quot|lt|gt|bp|emsp);/g, "")
        .replace(/<a(.*?)<\/a>/g,'')
        .replace(/<div(.*?)>/g,'')
        .replace(/<center>|<\/center>|<\/div>|/g, "")
        .replace(/\s|\n/g,'')
        .replace(/为您提供裴屠狗大.*?请务必保存好书签！/g,'')
        .replace(/精华书阁.*?最快更新最新章节！|\<br\>\(\)\<br\>|为您提供滚开大.*?请务必保存好书签！|(本章未完，点击下一页精彩继续)/g,'')
        .replace(/\<br\>\<br\>\<br\>(.*?)：https\:\/\/wap\.jhssd\.com，(.*?)！\<br\>/g,'');
        console.log(data1)
        return Response.success(data1);
    }
    return null;
}