function execute(url) {
    url = url.replace('www.','wap.')
    var browser = Engine.newBrowser();
    browser.setUserAgent(UserAgent.android());
    // var browser = Engine.newBrowser();
    let data  ="";
    let part1 = url.replace("https://m.2ksk.com", "").replace('.html','');
    // var next = part1;
    do  {    

        var doc = browser.launch(url, 1000);
        
        // let response = fetch("https://m.2ksk.com" + next +".html", {
        //     headers: {
        //         'user-agent': UserAgent.android()
        //     }
        // });
        // let doc = response.html();
            next = doc.select("#pb_next").attr("href").replace('.html','');
            console.log(next)
            let htm = doc.select("#nr1").html();
            data = data + htm +"";
    } while (next.includes(part1));
    browser.close()
    if (data) {
        var data1 = data.replace(/&(nbsp|amp|quot|lt|gt|bp|emsp);/g, "")
        .replace(/<a(.*?)<\/a>/g,'').replace(/\s|\n/g,'')
        .replace(/<div>.*?<\/div>/g,'')
        .replace(/\(本章未完，点击下一页精彩继续\)/g,'')
        .replace(/精华书阁m.2ksk.com，最快更新最新章节！/g,'')
        .replace(/<br>为您提供众筹取名大神的《.*?》最快更新，为了您下次还能查看到本书的最新章节，请务必保存好书签！<br>/g,'')
        .replace(/<br><br>第(.*?)https:\/\/m\.2ksk\.com(.*?)<br>/g,'');
   
        return Response.success(data1);
    }
    return null;
}