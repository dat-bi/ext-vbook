load('libs.js');
load('1qidian.js');
load('169shu.js');
load('269shu.js');
load('1ptwxz.js');
load('crypto.js');
load('1qimao.js');
function execute(url) {

    var id = url.replace(/https.*?\/1\//g, "").replace("/", "")
    var data;
    if (url.includes("sangtac")) {
        url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, STVHOST)
        if (url.includes("qidian")) {
            data = getTocQidian(url)
        } else if (url.includes("69shu")) {
            data = getToc69shu(id)
        } else if (url.includes("ptwxz")) {
            data = getTocPtwxz(id)
        } else if (url.includes("qimao")) {
            data = getTocQimao(id)
        } else {
            data = getTostv(url)
        }
    } else {

        if (url.includes("qidian")) {
            url = STVHOST + "/truyen/qidian/1/" + url.match(/\d+/g)[0] + "/";
            console.log(url)
            data = getTocQidian(url)
        } else if (url.includes("piaotia")) {
            data = getTocPtwxz1(url);
        } else if (url.includes("69shu")) {
            data = getToc69shu1(url);
        } else if (url.includes("69yuedu")) {
            data = getToc69yuedu(url);
        }
    }
    return Response.success(data)
}


function getTostv(url) {
    if (url.slice(-1) !== "/") url = url + "/";
    let host = url.split('/truyen/')[0];
    const source = url.split('/')[4];
    const bookId = url.split('/')[6];
    console.log(host + " " + source + " " + bookId)
    let list = [];
    let newurl = `https://fanqienovel.com/page/${bookId}`
    console.log(newurl)

    let response = fetch(newurl);
    if (response.ok) {
        let doc = response.html();

        let el = doc.select(".page-directory-content a.chapter-item-title")

        for (var i = 0; i < el.size(); i++) {
            var e = el.get(i);
            list.push({
                name: e.text(),
                url: "https://fanqienovel.com" + e.attr("href")
            })
        }
    }
    return list;
    //     var browser = Engine.newBrowser();
    //     browser.setUserAgent(UserAgent.android());
    //     browser.launch(url, 4000);
    //     browser.callJs(`
    // document.createElement = function(create) {
    //     return function() {
    //         var ret = create.apply(this, arguments);
    //         if (ret.tagName.toLowerCase() === "a" && arguments.callee.caller.toString().startsWith("function(e,a,b)")) { //
    //             arguments.callee.caller.arguments[0].setAttribute("chap-url", "/truyen/${source}/" + arguments.callee.caller.arguments[1] + "/${bookId}/" + arguments.callee.caller.arguments[2] + "/");
    //         }
    //         return ret;
    //     };
    // }(document.createElement)
    // `, 0);

    //     browser.callJs("renewchapter(true);", 1000);

    //     do {
    //         var listchapitems = browser.html().select(".listchapitem");
    //     } while (listchapitems.length == 0);

    //     listchapitems.forEach(chapItem => {
    //         let title = chapItem.text();
    //         let chapUrl = chapItem.attr("chap-url");
    //         list.push({
    //             name: title,
    //             url: chapUrl,
    //             host: host,
    //         });
    //     });


}
