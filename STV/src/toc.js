load('lib.js')
function execute(url) {
    if (url.slice(-1) !== "/")
        url = url + "/";
    let browser = Engine.newBrowser();
    browser.launchAsync(url);

    let injectJs = "function loadFuckkChapter(b){var a=new XMLHttpRequest;a.open(\"GET\",b,!0),a.onreadystatechange=function(){if(4==a.readyState&&200==a.status){var b=document.createElement(\"a\");b.className=\"fukkkkkk\",b.text=a.responseText,document.body.appendChild(b)}},a.send()};";

    function loadToc(url) {
        browser.callJs(injectJs + "loadFuckkChapter('" + url + "');", 100);
        var retry = 0;
        var json = '';
        while (retry < 5) {
            sleep(2000)
            let doc = browser.html();
            var data = doc.select("a.fukkkkkk");
            if (data.length > 0) {
                json = data.text();
                break;
            }
            retry++;
        }
        return json;
    }

    function waitTocUrl() {
        browser.waitUrl(".*?index.php.*?sajax=getchapterlist.*?", 10000);
        var urls = JSON.parse(browser.urls());
        var json = '';
        urls.forEach(requestUrl => {
            if (requestUrl.indexOf("getchapterlist") >= 0 && !json) {
                json = loadToc(requestUrl.replace("https://sangtacviet.pro", ""));
            }
        });
        return json;
    }

    var json = '';
    var retry = 0;
    while (retry < 5) {
        sleep(2000)
        let doc = browser.html();
        if (doc.select("#chaptercontainerinner").length > 0) {
            browser.callJs("document.getElementById('chaptercontainerinner').scrollIntoView();", 100);
            json = waitTocUrl();
            break;
        }
        retry++;
    }
    browser.close()
    "use strict";
// Array of bytes to Base64 string decoding
function b64ToUint6(nChr) {
  return nChr > 64 && nChr < 91
    ? nChr - 65
    : nChr > 96 && nChr < 123
    ? nChr - 71
    : nChr > 47 && nChr < 58
    ? nChr + 4
    : nChr === 43
    ? 62
    : nChr === 47
    ? 63
    : 0;
}

    if (json) {
        let list = [];
        let source = url.split('/')[4];
        let data = JSON.parse(json);
        let data0 = data.data;
        let enkey = data.enckey;
        let enkeyUTF8Output = base64DecToArr(enkey);
        let data1 = UTF8ArrToStr(enkeyUTF8Output);
            data1= data1.replace(/var(.*?)\(escape\(r\)\)\}\(/g,'').replace('))','')
    data1 = data1.split(',')
    let l0 = data1[0].replace("\"","").replace("\"","");
    let l1 = data1[1];
    let l2 = data1[2].replace("\"","").replace("\"","");
    let l3 = data1[3];
    let l4 = data1[4];
    let l5 = data1[5];
    l1 = parseInt(l1);
    l3 = parseInt(l3);
    l4 = parseInt(l4);
    l5 = parseInt(l5);
var bookid = ["", "split", "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/", "slice", "indexOf", "", "", ".", "pow", "reduce", "reverse", "0"];
function _0xe11c(d, e, f) {
    var g = bookid[2].split("");
    var h = g.slice(0, e); 
    var i = g.slice(0, f);
    var j = d.split("").reverse().reduce
        (function (a, b, c) {
            if (h.indexOf(b) !== -1)
                return a += h.indexOf(b) * (Math.pow(e, c))
        }, 0);
    var k = "";
    while (j > 0) {
        k = i[j % f] + k;
        j = (j - (j % f)) / f
    } 
    return k || 0
} 

function htk(h, u, n, t, e, r) {
    r = "";
    var len = h.length;
    for (var i = 0 ; i < len; i++) { 
        var s = "";
        while (h[i] !== n[e]) 
            {
             s += h[i];
             i++ 
            } 
         for (var j = 0; j < n.length; j++)
         s = s.replace(new RegExp(n[j], "g"), j);
          r += String.fromCharCode(_0xe11c(s, e, 10) - t)
        }           return decodeURIComponent(escape(r))
}
key= htk(l0,l1,l2,l3,l4,l5).replace(/if\(window(.*?)atob\(\'/g,'').replace(/\' \+ x.data\)\);}}catch\(e\){}\}/g,'')

        const aMyUTF8Output = base64DecToArr(key + data0);
        const data2 = UTF8ArrToStr(aMyUTF8Output);

        // let data1 = Buffer.from('MS0lMkYtMS0lMkYtQ2glQzYlQjAlQzYl'+chapList, 'base64').toString();
        // console.log(data1); MS0lMkYtMTA5Mjg0NTkyLSUyRi0lMjBD
        // var data1 = atob('MS0lMkYtMS0lMkYtQ2glQzYlQjAlQzYl' + chapList)
        let chapList = decodeURIComponent(data2)
        console.log(chapList)

        let list1 = ['biqugeinfo', 'biqugexs', 'uuxs', 'zwdu'];
        let list12 = ['69shuorg', 'xbiquge',];
        let start;
        if (chapList) {
            chapList = chapList.split("-//-")
            if (source === 'uukanshu') {
                start = chapList.length - 1
            } else if (list12.includes(source) === true) {
                start = 12
            } else if (source === 'biqugese') {
                start = 10
            } else if (source === 'biqugebz') {
                start = 9
            } else if (list1.includes(source) === true) {
                start = 1
            } else {
                start = 0
            }
            let end = (source === "uukanshu") ? -1 : chapList.length;
            let step = (source === "uukanshu") ? -1 : 1;
            for (; start !== end; start += step) {
                let chap = chapList[start].split("-/-");
                let name = chap[2];
                if (name) {
                    list.push({
                        name: name.replace('\n', '').trim()
                            .replace(/\s\s+/g, ' ')
                            .replace(/([\t\n]+|<br>|&nbsp;)/g, "")
                            .replace(/Thứ ([\d\,]+) chương/, "Chương $1:"),
                        url: url  + chap[1],
                        host: "https://sangtacviet.pro"
                    });
                }
            }
        }
        return Response.success(list);
    }
    return null;
}