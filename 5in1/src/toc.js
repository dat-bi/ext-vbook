load('libs.js');
function execute(url) {
    // url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, STVHOST)
    var id = url.replace(/https.*?\/1\//g, "").replace("/", "")
    var data;
    if (url.includes("sangtac") != 1) {
        // if (url.includes(",")) {
        //     data = getTocFanqienovel(url)
        // } else 
        if (url.includes("html5")) {
            data = getTocHtml5(url);
        } else if (url.includes("ptwxz")) {
            data = getTocPtwxz(url);
        } else if (url.includes("69shu")) {
            data = getTo69shu1(url);
        }
    } else {
        if (url.includes("uukanshu")) {
            data = getTocUU(id)
        } else if (url.includes("69shu")) {
            data = getTo69shu(id)
        } else {
            data = getTostv(url)
        }
    }
    return Response.success(data)
}
function getTocUU(id) {
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
function getTo69shu(id) {
    let response = fetch('https://www.69shu.com/' + id + '/');
    if (response.ok) {
        let doc = response.html('gbk');
        var data = [];
        var elems = doc.select('div.catalog > ul > li > a:not(#bookcase)');
        elems.forEach(function (e) {
            data.push({
                name: formatName(e.text()),
                url: e.attr('href'),
                host: 'https://www.69shu.com'
            })
        });
        return data;
    }
}
function getTo69shu1(url) {
    url = url.replace(/.+\.69shu\.com\/txt\/(.*?)\.htm/, 'https://www.69shu.com/$1').append('/');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html('gbk');
        var data = [];
        var elems = doc.select('div.catalog > ul > li > a:not(#bookcase)');
        elems.forEach(function (e) {
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
function getTocFanqienovel(url) {
    let newurl = `https://api5-normal-lf.fqnovel.com/reading/bookapi/directory/all_infos/v/?item_ids=${url}&iid=2159861899465991&aid=1967&version_code=311&update_version_code=31132`
    let response = fetch(newurl, {
        headers: {
            'user-agent': UserAgent.android()
        }
    });
    if (response.ok) {
        let res_json = response.json();
        let item = res_json.data;
        const book = [];
        for (let i = 0; i < item.length; i++) {
            book.push({
                name: item[i].title,
                url: 'https://novel.snssdk.com/api/novel/book/reader/full/v1/?group_id=' + item[i].item_id + "&item_id=" + item[i].item_id + "&aid=1977",
                host: "https://novel.snssdk.com"
            })
        }
        return book
    }
    return null;
}
function getTostv(url) {
    if (url.slice(-1) !== "/") url = url + "/";
    let host = url.split('/truyen/')[0];
    const source = url.split('/')[4];
    const bookId = url.split('/')[6];
    let list = [];
    var browser = Engine.newBrowser();
    browser.setUserAgent(UserAgent.android());
    browser.launch(url, 4000);
    browser.callJs(`
document.createElement = function(create) {
    return function() {
        var ret = create.apply(this, arguments);
        if (ret.tagName.toLowerCase() === "a" && arguments.callee.caller.toString().startsWith("function(e,a,b)")) { //
            arguments.callee.caller.arguments[0].setAttribute("chap-url", "/truyen/${source}/" + arguments.callee.caller.arguments[1] + "/${bookId}/" + arguments.callee.caller.arguments[2] + "/");
        }
        return ret;
    };
}(document.createElement)
`, 0);

    browser.callJs("renewchapter(true);", 1000);

    do {
        var listchapitems = browser.html().select(".listchapitem");
    } while (listchapitems.length == 0);

    listchapitems.forEach(chapItem => {
        let title = chapItem.text();
        let chapUrl = chapItem.attr("chap-url");
        list.push({
            name: title,
            url: chapUrl,
            host: host,
        });
    });

    return list;
}
function getTocPtwxz(url) {
    var host = 'https://www.ptwxz.com';
    url = url.replace(/www\.ptwxz\.com\/bookinfo\/(\d+)\/(\d+)\.html$/, 'www.ptwxz.com/html/$1/$2/').append('/');

    var response = fetch(url);
    var doc = response.html('gb2312');

    var data = [];
    var elems = $.QA(doc, 'div.centent li > a');

    if (!elems.length) return Response.error(url);

    elems.forEach(function (e) {
        data.push({
            name: e.text(),
            url: e.attr('href').mayBeFillHost(url),
            host: host
        })
    });

    return data;
}
function getTocHtml5(url) {
    const bookidRegex = /bookid=(\d+)/;
    const match = url.match(bookidRegex);
    const resourceid = match[1];
    let url_catalog = "https://novel.html5.qq.com/cgi-bin/novel_reader/catalog?book_id=" + resourceid
    let response = fetch(url_catalog, { "headers": { "Referer": "https://bookshelf.html5.qq.com/qbread/adread/catalog" } })
    let doc = response.json();
    let el = doc.catalog
    const data = [];
    for (let i = 0; i < el.length; i++) {
        let link = "https://bookshelf.html5.qq.com/qbread/api/wenxue/buy/ad-chapter/v3?resourceid=" + resourceid + "&serialid=" + el[i].serial_id + "&apn=1&readnum=1&duration=2&srcCh="
        data.push({
            name: el[i].serial_name,
            url: link,
            host: "https://bookshelf.html5.qq.com"
        })
    }
    return data
}