load('crypto.js');
load('aes.js');
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
    if (json) {
        let list = [];
        let source = url.split('/')[4];
        let data = JSON.parse(json);
        let chapList = data.data;
                // console.log(chapList)
    //     let enkey = data.enckey

    //     var words = CryptoJS.enc.Base64.parse(enkey);
    //     var data1 = CryptoJS.enc.Utf8.stringify(words);
    //         data1= data1.replace(/var(.*?)\(escape\(r\)\)\}\(/g,'').replace('))','')
    //         console.log(data1)
    //     data1 = data1.split(',')
    //     let l0 = data1[0].replace("\"","").replace("\"","");
    //     let l1 = data1[1];
    //     let l2 = data1[2].replace("\"","").replace("\"","");
    //     let l3 = data1[3];
    //     let l4 = data1[4];
    //     let l5 = data1[5];
    //     l1 = parseInt(l1);
    //     l3 = parseInt(l3);
    //     l4 = parseInt(l4);
    //     l5 = parseInt(l5);
    // var bookid = ["", "split", "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/", "slice", "indexOf", "", "", ".", "pow", "reduce", "reverse", "0"];
    // function _0xe11c(d, e, f) {
    //     var g = bookid[2].split("");
    //     var h = g.slice(0, e); 
    //     var i = g.slice(0, f);
    //     var j = d.split("").reverse().reduce
    //         (function (a, b, c) {
    //             if (h.indexOf(b) !== -1)
    //                 return a += h.indexOf(b) * (Math.pow(e, c))
    //         }, 0);
    //     var k = "";
    //     while (j > 0) {
    //         k = i[j % f] + k;
    //         j = (j - (j % f)) / f
    //     } 
    //     return k || 0
    // } 

    // function htk(h, u, n, t, e, r) {
    //     r = "";
    //     var len = h.length;
    //     for (var i = 0 ; i < len; i++) { 
    //         var s = "";
    //         while (h[i] !== n[e]) 
    //             {
    //              s += h[i];
    //              i++ 
    //             } 
    //          for (var j = 0; j < n.length; j++)
    //          s = s.replace(new RegExp(n[j], "g"), j);
    //           r += String.fromCharCode(_0xe11c(s, e, 10) - t)
    //         }           return decodeURIComponent(escape(r))
    // }
    // key= htk(l0,l1,l2,l3,l4,l5)
    // console.log(key)
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
            } else if (source === '69shu') {
                start = 5
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
                        url: url + "/" + chap[1],
                        host: "https://sangtacviet.pro"
                    });
                }
            }
        }
        return Response.success(list);
    }
    return null;
}

// /* Base64 string to array encoding */

// /* UTF-8 array to JS string and vice versa */

//         const aMyUTF8Output = base64DecToArr(key + data0);
//         const data2 = UTF8ArrToStr(aMyUTF8Output);

//         // let data1 = Buffer.from('MS0lMkYtMS0lMkYtQ2glQzYlQjAlQzYl'+chapList, 'base64').toString();
//         // console.log(data1); MS0lMkYtMTA5Mjg0NTkyLSUyRi0lMjBD
//         // var data1 = atob('MS0lMkYtMS0lMkYtQ2glQzYlQjAlQzYl' + chapList)
//         let chapList = decodeURIComponent(data2)
//         console.log(chapList)

function decryptAes(encrypted, key, iv) {
	encrypted = CryptoJS.enc.Base64.parse(encrypted);
	key = CryptoJS.enc.Utf8.parse(key);
	iv = CryptoJS.enc.Utf8.parse(iv);
	var decrypted = CryptoJS.AES.decrypt({ciphertext: encrypted}, key, {iv: iv});
	return decrypted.toString(CryptoJS.enc.Utf8);
}
function CryptoJSAesDecrypt(passphrase, encrypted_json_string) {
    var obj_json = JSON.parse(encrypted_json_string);
    var encrypted = obj_json.ciphertext;
    var salt = CryptoJS.enc.Hex.parse(obj_json.salt);
    var iv = CryptoJS.enc.Hex.parse(obj_json.iv);
    var key = CryptoJS.PBKDF2(passphrase, salt, {
        hasher: CryptoJS.algo.SHA512,
        keySize: 64 / 8,
        iterations: 999
    });
    var decrypted = CryptoJS.AES.decrypt(encrypted, key, {
        iv: iv
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
}