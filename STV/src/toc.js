function execute(url) {
    if (url.slice(-1) !== "/")
        url = url + "/";
    var idBook = url.split('/')[6];
    var idHost = url.split('/')[4];
    if (idHost === 'fanqie') {
        var json = Http.get('https://fanqienovel.com/api/reader/directory/detail').params({bookId: idBook}).string();
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
    } 
    else if (idHost === 'uukanshu') {
            var doc = Http.get("https://sj.uukanshu.com/book.aspx?id=" + idBook).html();

        if (doc) {
            var el = doc.select("#chapterList a")
            var data = [];
            for (var i = 0; i < el.size(); i++) {
                var e = el.get(i);
                data.push({
                    name: e.select("a").text(),
                    url: 'https://sangtacviet.pro/truyen/uukanshu/1/'+idBook +'/' +e.attr("name"),
                })
            }

        var page = doc.select(".pages a").last().attr("href").match(/page=(\d+)/);
        if (page) {
            page = parseInt(page[1]);
            if (page > 1) {
                for (var p = 2; p <= page; p++) {
                    doc = Http.get(url + "&page=" + p).html();
                    var el = doc.select("#chapterList a")
                    for (var i = 0; i < el.size(); i++) {
                        var e = el.get(i);
                        data.push({
                            name: e.select("a").text(),
                            url: e.attr("href")
                        })
                    }
                }
            }
        }

        return Response.success(data);
        }
    }
    else if (idHost === 'tadu') {
            function capitalize(s){
        return s[0].toUpperCase() + s.slice(1);
    }
            var doc = Http.get('https://www.tadu.com/book/catalogue/'+idBook).html();
            var el = doc.select(".chapter").select("a");
            let data = [];
            for (var i = 0; i < el.size(); i++) {
                var e = el.get(i);
                data.push({
                    name: capitalize(e.text()),
                    url: 'https://sangtacviet.pro/truyen/tadu/1/'+ idBook +'/' + e.attr("href").replace('/book/','').replace(/\s/g,'')
                })
            }

         return Response.success(data);
    }    
    else if (idHost === 'ciweimao'){
        let response = fetch('https://mip.ciweimao.com/book/' + idBook);
        if (response.ok) {
            let doc = response.html();
            let el1 = doc.select(".cnt-box.catalogue").last()
            let el = el1.select("li a")
            let data = [];
            for (let i = 0;i < el.size(); i++) {
                var e = el.get(i);
                let isVip = e.select("i").attr("class").replace(/icon/g,"").replace("-","").trim();
                let name = e.select("a").text();
                if(isVip === "lock"){
                    name = "[VIP] " + name;
                }

                data.push({
                    name: name,
                    url: 'https://sangtacviet.pro/truyen/tadu/1/'+ idBook +'/' + e.attr("href").match(/\d+/),
                })


            }
            return Response.success(data);
        }
    }
    else
    {
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