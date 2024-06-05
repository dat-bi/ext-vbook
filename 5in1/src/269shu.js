var host69yuedu = 'https://www.69yuedu.net';
function getChap69yuedu(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html('gbk');
        if (doc.html().includes("vip='69shu")) {
            var browser = Engine.newBrowser() // Khởi tạo browser
            doc = browser.launch(url, 4000)
        }
        var htm = $.Q(doc, '.content', { remove: ['h1', 'div'] }).html();

        htm = cleanHtml(htm)
            .replace(/^ *第\d+章.*?<br>/, '') // Ex: '  第11745章 大结局，终<br>'
            .replace('(本章完)', '')
            ;
    }
    return htm.replace(/<br\s*\/?>|\n/g, "<br><br>");
}
function getToc69yuedu(url) {
    let rid = url.replace("https://www.69yuedu.net/article/", "").replace(".html", "")
    url = url.replace(".html", ".json")
    console.log(rid)
    let response = fetch(url);
    if (response.ok) {
        let doc = response.json('gbk');
        var data = [];
        var elems = doc.items;
        elems.forEach(function (e) {
            data.push({
                name: formatName(e.n),
                url: "https://www.69yuedu.net/r/" + rid +"/" + e.cid + ".html",
                host: host69yuedu
            })
        });
        return data;
    }
}
function formatName(name) {
    var re = /^(\d+)\.第(\d+)章/;
    return name.replace(re, '第$2章');
}
function getDetail69yuedu(url) {
    let response = fetch(url);
    let doc = response.html('gbk');
    let data = {
        name: $.Q(doc, 'div.booknav2 > h1 > a').text(),
        cover: host69yuedu + $.Q(doc, 'div.bookimg2 > img').attr('src'),
        author: $.Q(doc, 'div.booknav2 > p:nth-child(2) > a').text().trim(),
        description: $.Q(doc, 'div.navtxt > p').html(),
        detail: $.QA(doc, 'div.booknav2 p', { m: x => x.text(), j: '<br>' })
    }
    return data;
}