load('libs.js');
function execute(url) {
    if(url.includes("uukanshu")){
        return Response.success(getTocUU(url))
    } else if(url.includes("69shu")){
        return Response.success(getTo69shu(url))
    }else if(url.includes("fqnovel")||url.includes("novel.snssdk")){
        return Response.success(getToFanqie(url))
    }
    return Response.success(getTostv(url))
}
function getTocUU(url){
    var htm = "";
    if (url.indexOf("sj.uukanshu.com") !== -1) {
        var doc = Http.get(url).html();
        doc.select(".ad_content").remove();
        doc.select("div.box").remove();
        htm = doc.select("#bookContent").html();
    } else {
        var doc = Http.get(url).html("gb2312");
        doc.select(".ad_content").remove();
        htm = doc.select("#contentbox").html();
    }
    htm = htm.replace(/[UＵ][UＵ]\s*看书\s*[wｗ][wｗ][wｗ][\.．][uｕ][uｕ][kｋ][aａ][nｎ][sｓ][hｈ][uｕ][\.．][cｃ][oｏ][mｍ]/gi, "");
    htm = htm.replace(/\&nbsp;/g, "").replace(/<br\s*\/?>|\n/g,"<br><br>");
    return htm;
}
function getTo69shu(url){
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html('gbk');

        var htm = $.Q(doc, 'div.txtnav', {remove: ['h1', 'div']}).html();

        htm = cleanHtml(htm)
            .replace(/^ *第\d+章.*?<br>/, '') // Ex: '  第11745章 大结局，终<br>'
            .replace('(本章完)', '')
            ;
        // log(htm);
        return htm.replace(/<br\s*\/?>|\n/g,"<br><br>");
    }
    return null;
}
function getToYushu(url) {
    const doc = fetch(url).html();
    var content = doc.select("#BookText").html();
    var nextPage = doc.select('.articlebtn a').last();
    while(nextPage.text() === '下一页'){
        var doc2 = fetch('https://www.yushugu.cc/'+nextPage.attr('href')).html();
        content += doc2.select("#BookText").html();
        var nextPage = doc2.select('.articlebtn a').last();
    }
    return content.replace(/<br\s*\/?>|\n/g,"<br><br>");
}
function getToFanqie(url) {
    let response = fetch(url, {
        headers: {
            'user-agent': UserAgent.android()
        }
    });
    let res_json = response.json();
        let dataa = res_json.data.content;  
        var doc = Html.parse(dataa);
        var content = doc.select('article').html();
    return content;

}
function getTostv(url) {
    if (url.slice(-1) !== "/") url = url + "/";
    const book = url.split('/truyen/')[1];
        var browser = Engine.newBrowser();
        browser.setUserAgent(UserAgent.android());
        browser.launch(url, 4000);
        browser.callJs(`document.location='/truyen/${book}';`, 2000);
        browser.callJs(`document.querySelector(".blk-item2").click();`, 1000);
        let doc = browser.html()
        var content = doc.select("#content-container .contentbox").html();
        browser.close();
        content = content.replace(/<span(.*?)>(.*?)<\/span>/g, "")
            .replace(/id\=\"(.*?)\"/g, '')
            .replace(/p\=\"(.*?)\"/g, '')
            .replace(/onclick\=\"pr\(this\)\;\"/g, '')
            .replace(/isname\=\"true\"/g, '')
            .replace(/namelen\=\".*?\"/g, '')
            .replace(/asynctask\=\".*?\"/g, '')
            .replace(/<\/i><i h="[A-Za-z](.*?)\"(.*?)t=\"[A-Za-z](.*?)\"(.*?)<\/i>/gim, '</i>')
            .replace(/<i(.*?)h=\"(.*?)t=\"(.*?)\"(.*?)<\/i>/g, "$3")
            .replace(/<i(.*?)t=\"(.*?)\"<\/i>/g, "$2")
            .replace(/\·\·\·\·\·\·/g, "")
            .replace(/\s/g, "")
        return content;
}