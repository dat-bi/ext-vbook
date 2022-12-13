load('libs.js');

function execute(url) {
    if(url.includes("fanqienovel")){
        url = "https://sangtacviet.pro/truyen/fanqie/1/" + url.match(/\d+/g)[0]
    }
    if(url.includes("fqnovel")){
        url = "https://sangtacviet.pro/truyen/fanqie/1/" + url.match(/\d+/g)[1]
    }
    var id = url.replace(/https.*?\/1\//g,"").replace("/","")
    if(url.includes("qidian")){
        return Response.success(getTocQidian(id))
    } else if (url.includes("uukanshu")) {
        return Response.success(getTocUU(id))
    } else if (url.includes("69shu")) {
        return Response.success(getTo69shu(id))
    } else if (url.includes("yushu")) {
        return Response.success(getTocYuShuBo(id))
    } else if (url.includes("fanqie")) {
        return Response.success(getTocFanqienovel(url))
    }
    return null
}
function getTocUU(id){
    url = "https://sj.uukanshu.com/book.aspx?id=" + id;
    var doc = Http.get(url).html();
    var el = doc.select("#chapterList a")
    var data = [];
    for (var i = 0; i < el.size(); i++) {
        var e = el.get(i);
            data.push({
                name: e.select("a").text(),
                url: e.attr("href"),
                host: "https://sj.uukanshu.com"
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
                            url: e.attr("href"),
                            host: "https://sj.uukanshu.com"
                        })
                    }
                }
            }
        }
    return data;
}
function getTo69shu(id){
    let response = fetch('https://www.69shu.com/' + id +'/');
    if (response.ok) {
        let doc = response.html('gbk');
		var data = [];
		var elems = doc.select('div.catalog > ul > li > a:not(#bookcase)');
		elems.forEach(function(e) {
			data.push({
				name: formatName(e.text()),
				url: e.attr('href'),
				host: 'https://www.69shu.com'
			})
		});
		return data;
    }
}
function formatName(name) {
    var re = /^(\d+)\.第(\d+)章/;

    return name.replace(re, '第$2章');
}
function getTocYuShuBo(){
    const yUrl = 'https://www.yushugu.com/list_other_'+id+'.html';
    var doc = fetch(yUrl).html();
    var el = doc.select("ul.chapter-list li a")
    const list = [];
    for (var i = 0; i < el.size(); i++) {
        var e = el.get(i);
        list.push({
            name: e.text(),
            url: e.attr("href"),
            host: "https://www.yushugu.com"
        })
    }
    return list;
}
function parseDoc(doc, arr) {
    let elems = $.QA(doc, '#j-catalogWrap > div.volume-wrap > div > ul > li');
    if (!elems.length) return;

    let host = 'https://book.qidian.com';

    elems.forEach(function(e) {
        let url = $.Q(e, 'a').attr('href').mayBeFillHost(host);
        let vip = url.includes('vipreader') ? '[VIP] ' : '';

        arr.push({
            name: vip + $.Q(e, 'a').text(),
            url: url,
            host: host
        })
    })
}
function getTocQidian(url) {
    url = 'https://book.qidian.com/info/' + url;
    // log(url);

    let response = fetch(url);

    if (response.ok) {
        let doc = response.html();

        let data = [];

        parseDoc(doc, data);
        log(data.length);
        if (data.length) return Response.success(data);

        // API
        let bookId = url.match(/qidian\.com\/(info|book)\/(\d+)/)[2];
        let cookies = response.header("Set-Cookie");

        let _csrfToken = cookies.match(/_csrfToken=(.*?);/)[1];

        let ajaxUrl = 'https://book.qidian.com/ajax/book/category?_csrfToken={0}&bookId={1}';
        let json = Http.get(String.format(ajaxUrl, _csrfToken, bookId)).string();

        let j = JSON.parse(json);

        if (j.code == 1) return null;

        let freeFm = 'https://read.qidian.com/chapter/{0}/{1}';
        let vipFm = 'https://vipreader.qidian.com/chapter/{0}/{1}';
        
        j.data.vs.forEach(function(section){
            let chapters = section.cs;
            chapters.forEach(function(chap){
                data.push({
                    name: (section.hS ? '[VIP] ' : '') + chap.cN,
                    url: String.format(section.hS ? vipFm : freeFm, bookId, chap.id),
                    host: 'https://www.qidian.com'
                })
            })
        })

        if (data.length) return data;
        return null;
    }
    return null;
}
function getTocFanqienovel(url) {
    if(url.includes("sangtacviet")){
        url = "https://fanqienovel.com/page/" + url.match(/\d+/g)[1]
    }
    if(url.includes("api3-normal-lf.fqnovel")){
        var response = fetch(url, {
        headers: {
            'user-agent': UserAgent.android()
        }
    });
    } else {
        var bookID = url.match(/\d+/g)[0]
        console.log(bookID)
	    var response = fetch("https://api3-normal-lf.fqnovel.com/reading/bookapi/directory/all_items/v/?need_version=true&book_id="+bookID+"&iid=2665637677906061&aid=1967&app_name=novelapp&version_code=495", {
        headers: {
            'user-agent': UserAgent.android()
        }
    });
    }
    if (response.ok) {
        let res_json = response.json();
        let allBook = res_json.data.item_data_list;
        
        var book = [];
        for (let i = 0; i < allBook.length; i++) {
            let item = allBook[i];
            
            book.push({
                    name: item['title'],           
                    url: 'https://novel.snssdk.com/api/novel/book/reader/full/v1/?group_id=' + item['item_id'] + "&item_id=" + item['item_id'] + "&aid=1977",
                    host: "https://novel.snssdk.com"
        })
        }
        return book;  
     }
    return null;
}