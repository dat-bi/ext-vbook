function execute(url) {
    if (url.slice(-1) !== "/")
        url = url + "/";
    if(url.includes('fanqie')){
        let idBook = url.split('/')[6];
        const json = Http.get('https://fanqienovel.com/api/reader/directory/detail').params({bookId: idBook}).string();
        if (json) {
            var allChap = JSON.parse(json).data.chapterListWithVolume;
            let list = [];
            for(var book in allChap){
                for (var chapter in allChap[book]){
                    var item = allChap[book][chapter];
                    list.push({
                        name: item['title'],
                        url: 'https://sangtacviet.pro/truyen/fanqie/1/'+idBook +'/' +item['itemId']
                    })
                }
            }
            return Response.success(list);
        }
    } else {
        let browser = Engine.newBrowser();
        browser.launchAsync(url);
        var retry = 0;
        while (retry < 5) {
            sleep(1000)
            let doc = browser.html();
            if (doc.select("#chaptercontainerinner").length > 0) {
                browser.callJs("document.getElementById('chaptercontainerinner').scrollIntoView();", 100);
                break;
            }
            retry++;
        }
        retry = 0;
        var el;
        while (retry < 5) {
            sleep(1000)
            let doc = browser.html();
            if (doc.select("a.listchapitem").length > 0) {
                el = doc.select("a.listchapitem");
                break;
            }
            retry++;
        }
        browser.close()

        if (el) {
            let list = [];
            var j = 0
            for (let i = 0; i < el.length; i++) {
                var e = el.get(i);
                j++;
                list.push({
                    name: e.text(),
                    url: url  + j
                })
            }
            return Response.success(list);
        }
    }
    return null;
}