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

function base64DecToArr(sBase64, nBlocksSize) {
  const sB64Enc = sBase64.replace(/[^A-Za-z0-9+/]/g, "");
  const nInLen = sB64Enc.length;
  const nOutLen = nBlocksSize
    ? Math.ceil(((nInLen * 3 + 1) >> 2) / nBlocksSize) * nBlocksSize
    : (nInLen * 3 + 1) >> 2;
  const taBytes = new Uint8Array(nOutLen);

  let nMod3;
  let nMod4;
  let nUint24 = 0;
  let nOutIdx = 0;
  for (let nInIdx = 0; nInIdx < nInLen; nInIdx++) {
    nMod4 = nInIdx & 3;
    nUint24 |= b64ToUint6(sB64Enc.charCodeAt(nInIdx)) << (6 * (3 - nMod4));
    if (nMod4 === 3 || nInLen - nInIdx === 1) {
      nMod3 = 0;
      while (nMod3 < 3 && nOutIdx < nOutLen) {
        taBytes[nOutIdx] = (nUint24 >>> ((16 >>> nMod3) & 24)) & 255;
        nMod3++;
        nOutIdx++;
      }
      nUint24 = 0;
    }
  }

  return taBytes;
}

/* Base64 string to array encoding */
function uint6ToB64(nUint6) {
  return nUint6 < 26
    ? nUint6 + 65
    : nUint6 < 52
    ? nUint6 + 71
    : nUint6 < 62
    ? nUint6 - 4
    : nUint6 === 62
    ? 43
    : nUint6 === 63
    ? 47
    : 65;
}


/* UTF-8 array to JS string and vice versa */

function UTF8ArrToStr(aBytes) {
  let sView = "";
  let nPart;
  const nLen = aBytes.length;
  for (let nIdx = 0; nIdx < nLen; nIdx++) {
    nPart = aBytes[nIdx];
    sView += String.fromCodePoint(
      nPart > 251 && nPart < 254 && nIdx + 5 < nLen /* six bytes */
        ? /* (nPart - 252 << 30) may be not so safe in ECMAScript! So…: */
          (nPart - 252) * 1073741824 +
            ((aBytes[++nIdx] - 128) << 24) +
            ((aBytes[++nIdx] - 128) << 18) +
            ((aBytes[++nIdx] - 128) << 12) +
            ((aBytes[++nIdx] - 128) << 6) +
            aBytes[++nIdx] -
            128
        : nPart > 247 && nPart < 252 && nIdx + 4 < nLen /* five bytes */
        ? ((nPart - 248) << 24) +
          ((aBytes[++nIdx] - 128) << 18) +
          ((aBytes[++nIdx] - 128) << 12) +
          ((aBytes[++nIdx] - 128) << 6) +
          aBytes[++nIdx] -
          128
        : nPart > 239 && nPart < 248 && nIdx + 3 < nLen /* four bytes */
        ? ((nPart - 240) << 18) +
          ((aBytes[++nIdx] - 128) << 12) +
          ((aBytes[++nIdx] - 128) << 6) +
          aBytes[++nIdx] -
          128
        : nPart > 223 && nPart < 240 && nIdx + 2 < nLen /* three bytes */
        ? ((nPart - 224) << 12) +
          ((aBytes[++nIdx] - 128) << 6) +
          aBytes[++nIdx] -
          128
        : nPart > 191 && nPart < 224 && nIdx + 1 < nLen /* two bytes */
        ? ((nPart - 192) << 6) + aBytes[++nIdx] - 128
        : /* nPart < 127 ? */ /* one byte */
          nPart
    );
  }
  return sView;
}

function strToUTF8Arr(sDOMStr) {
  let aBytes;
  let nChr;
  const nStrLen = sDOMStr.length;
  let nArrLen = 0;

  /* mapping… */
  for (let nMapIdx = 0; nMapIdx < nStrLen; nMapIdx++) {
    nChr = sDOMStr.codePointAt(nMapIdx);

    if (nChr > 65536) {
      nMapIdx++;
    }

    nArrLen +=
      nChr < 0x80
        ? 1
        : nChr < 0x800
        ? 2
        : nChr < 0x10000
        ? 3
        : nChr < 0x200000
        ? 4
        : nChr < 0x4000000
        ? 5
        : 6;
  }

  aBytes = new Uint8Array(nArrLen);

  /* transcription… */
  let nIdx = 0;
  let nChrIdx = 0;
  while (nIdx < nArrLen) {
    nChr = sDOMStr.codePointAt(nChrIdx);
    if (nChr < 128) {
      /* one byte */
      aBytes[nIdx++] = nChr;
    } else if (nChr < 0x800) {
      /* two bytes */
      aBytes[nIdx++] = 192 + (nChr >>> 6);
      aBytes[nIdx++] = 128 + (nChr & 63);
    } else if (nChr < 0x10000) {
      /* three bytes */
      aBytes[nIdx++] = 224 + (nChr >>> 12);
      aBytes[nIdx++] = 128 + ((nChr >>> 6) & 63);
      aBytes[nIdx++] = 128 + (nChr & 63);
    } else if (nChr < 0x200000) {
      /* four bytes */
      aBytes[nIdx++] = 240 + (nChr >>> 18);
      aBytes[nIdx++] = 128 + ((nChr >>> 12) & 63);
      aBytes[nIdx++] = 128 + ((nChr >>> 6) & 63);
      aBytes[nIdx++] = 128 + (nChr & 63);
      nChrIdx++;
    } else if (nChr < 0x4000000) {
      /* five bytes */
      aBytes[nIdx++] = 248 + (nChr >>> 24);
      aBytes[nIdx++] = 128 + ((nChr >>> 18) & 63);
      aBytes[nIdx++] = 128 + ((nChr >>> 12) & 63);
      aBytes[nIdx++] = 128 + ((nChr >>> 6) & 63);
      aBytes[nIdx++] = 128 + (nChr & 63);
      nChrIdx++;
    } /* if (nChr <= 0x7fffffff) */ else {
      /* six bytes */
      aBytes[nIdx++] = 252 + (nChr >>> 30);
      aBytes[nIdx++] = 128 + ((nChr >>> 24) & 63);
      aBytes[nIdx++] = 128 + ((nChr >>> 18) & 63);
      aBytes[nIdx++] = 128 + ((nChr >>> 12) & 63);
      aBytes[nIdx++] = 128 + ((nChr >>> 6) & 63);
      aBytes[nIdx++] = 128 + (nChr & 63);
      nChrIdx++;
    }
    nChrIdx++;
  }

  return aBytes;
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