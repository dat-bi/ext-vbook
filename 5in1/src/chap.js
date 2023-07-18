// https://stackoverflow.com/a/4673436
if (!String.format) {
    String.format = function (format) {
        var args = Array.prototype.slice.call(arguments, 1);
        return format.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined' ?
                args[number] :
                match;
        });
    };
}
let STVHOST = "https://sangtacviet.vip/";
function getLink(link) {
    const BOOK_ID_REGEX = /(?:book|m)?\.qidian\.com\/(?:info|book)\/(\d+)(:?\.html)?/
    let m = link.match(BOOK_ID_REGEX)
    return m && m[1]
}
try {
    if (CONFIG_URL) {
        STVHOST = CONFIG_URL;
    }
} catch (error) {
}
let time = "2023";
try {
    if (CONFIG_TIME) {
        time = CONFIG_TIME;
    }
} catch (error) {
}
// https://stackoverflow.com/a/18234317
String.prototype.formatUnicorn = String.prototype.formatUnicorn ||
    function () {
        "use strict";
        var str = this.toString();
        if (arguments.length) {
            var t = typeof arguments[0];
            var key;
            var args = ("string" === t || "number" === t) ?
                Array.prototype.slice.call(arguments)
                : arguments[0];

            for (key in args) {
                str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key]);
            }
        }

        return str;
    };

String.prototype.append = function (w) {
    if (this.endsWith(w)) return this;
    return this + w;
}

String.prototype.prepend = function (w) {
    if (this.startsWith(w)) return this;
    return w + this;
}

String.prototype.rtrim = function (s) {
    if (s == undefined) s = '\\s';
    return this.replace(new RegExp("[" + s + "]*$"), '');
}

String.prototype.ltrim = function (s) {
    if (s == undefined) s = '\\s';
    return this.replace(new RegExp("^[" + s + "]*"), '');
}

String.prototype.mayBeFillHost = function (host) {
    var url = this.trim();
    if (!url) return '';
    if (url.startsWith(host)) return url;
    if (url.startsWith('//')) return host.split('//')[0] + url;

    return host.rtrim('/') + '/' + url.ltrim('/');
}

// --------------------------------------------------

var TypeChecker = {
    isString: function (o) {
        return typeof o == "string" || (typeof o == "object" && o.constructor === String);
    }, // https://stackoverflow.com/a/9729103
    isNumber: function (o) {
        return typeof o == "number" || (typeof o == "object" && o.constructor === Number);
    }, // https://stackoverflow.com/a/9729103
    isArray: function (o) {
        return o instanceof Array;
    },
    isFunction: function (o) {
        return o && {}.toString.call(o) === '[object Function]';
    }, // https://stackoverflow.com/a/7356528
    isObject: function (o) {
        return typeof o === 'object' && o !== null;
    }, // https://stackoverflow.com/a/8511332
};

// --------------------------------------------------

function log(o, msg) {
    Console.log('___' + (msg || '') + '___');
    if (TypeChecker.isArray(o)) {
        Console.log(JSON.stringify(o, null, 2));
    }
    else {
        Console.log(o);
    }
}

function cleanHtml(html) {
    html = html.replace(/\n/g, '<br>');
    // remove duplicate br tags
    html = html.replace(/(<br>\s*){2,}/gm, '<br>');
    // strip html comments
    html = html.replace(/<!--[^>]*-->/gm, '');
    // html decode
    html = html.replace(/&nbsp;/g, '');
    // trim br tags
    html = html.replace(/(^(\s*<br>\s*)+|(<br>\s*)+$)/gm, '');

    return html.trim();
}


// --------------------------------------------------

var $ = {
    Q: function (e, q, i) {
        var _empty = Html.parse('').select('body');

        var els = e.select(q);
        if (els == '' || els.size() == 0) return _empty;
        if (i == undefined) return els.first();

        if (typeof (i) == 'number') {
            if (i == -1) return els.last();
            if (i >= els.size()) return _empty;

            return els.get(i);
        } else {
            if (i.remove) {
                els.select(i.remove).remove();
            }
            return els;
        }
    },
    QA: function (e, q, o) {
        var arr = [];
        var els = e.select(q);
        o = o || {};

        if (els == '' || els.size() == 0) return o.j ? '' : arr;

        var processItem = function (item) {
            if (o.f) {
                if (o.f(item)) arr.push(o.m ? o.m(item) : item);
            } else {
                arr.push(o.m ? o.m(item) : item);
            }
        }

        var count = els.size();

        if (o.reverse) {
            for (var i = count - 1; i >= 0; i--) {
                var item = els.get(i);
                processItem(item);
            }
        } else {
            for (var i = 0; i < count; i++) {
                var item = els.get(i);
                processItem(item);
            }
        }

        if (o.j && typeof (o.j) == 'string') return arr.join(o.j);

        return arr;
    }

}
function execute(url) {
    if (url.includes("content?item_id=")) {
        return Response.success(getToFanqie(url))
    }
    if (url.includes("sangtac") != 1) {
        if (url.includes("html5")) {
            return Response.success(getToHtml5(url))
        } else if (url.includes("ptwxz")) {
            return Response.success(getToPtwxz(url))
        } else if (url.includes("69shu")) {
            return Response.success(getTo69shu(url))
        } else if (url.includes("uukanshu")) {
            return Response.success(getTocUU(url))
        }
    } else {
        return Response.success("Hiện tại chưa lấy được nội dung từ STV, đọc web khác đi!")

    }

}
function getToPtwxz(url) {
    var response = fetch(url);
    var doc = response.html('gb2312');
    var htm = $.Q(doc, 'body', { remove: 'h1, div, table, script, center' }).html();
    htm = cleanHtml(htm);
    return htm.replace(/<br\s*\/?>|\n/g, "<br><br>");
}
function getToHtml5(url) {
    const [resourceId, serialId] = url.match(/resourceid=(\d+).*serialid=(\d+)/).slice(1);
    let response = fetch('https://novel.html5.qq.com/be-api/content/ads-read', {
        method: 'POST',
        headers: {
            'Referer': 'https://novel.html5.qq.com/',
            'Q-GUID': '0ee63838b72eb075f63e93ae0bc288cb',
            'QIMEI36': '8ff310843a87a71101958f5610001e316a11',
        },
        body: JSON.stringify({
            'ContentAnchorBatch': [
                {
                    'BookID': resourceId,
                    'ChapterSeqNo': [serialId]
                }
            ],
            'Scene': 'chapter'
        })
    });
    let doc = response.json();
    let content = doc.data.Content[0].Content[0]
    // if(!doc.data.isFree) return Response.success("Không FREE");
    // let content = doc.data.content.join("<br>")
    content = content.replace(/\r\n/g, "<br><br>").replace(/<br\s*\/?>|\n/g, "<br><br>")

    return content;
}
function getTocUU(url) {
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
    htm = htm.replace(/\&nbsp;/g, "").replace(/<br\s*\/?>|\n/g, "<br><br>");
    return htm;
}
function getTo69shu(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html('gbk');

        var htm = $.Q(doc, 'div.txtnav', { remove: ['h1', 'div'] }).html();

        htm = cleanHtml(htm)
            .replace(/^ *第\d+章.*?<br>/, '') // Ex: '  第11745章 大结局，终<br>'
            .replace('(本章完)', '')
            ;
        // log(htm);
        return htm.replace(/<br\s*\/?>|\n/g, "<br><br>");
    }
    return null;
}
function getToFanqie(url) {
    let response_chapter_info = fetch(url)
    if (response_chapter_info.ok) {
        let json = response_chapter_info.json();
        let chapter_info = json.data.data.content.replace(/<br\s*\/?>|\n/g, "<br><br>");
        return chapter_info;
    }
    return "Kiểm tra lại app Fanqie";

}
function getTostv(url) {
    if (url.slice(-1) !== "/") url = url + "/";
    // var content = "";
    const book = url.split('/truyen/')[1];
    var browser = Engine.newBrowser();
    // browser.setUserAgent(UserAgent.android());
    // browser.launch(url, 1000);
    // browser.callJs(`document.location='/truyen/${book}';`, 2000);
    // browser.callJs(`document.querySelector(".blk-item2").click();`, 1000);
    // let doc = browser.html()
    // var content = doc.select("#content-container .contentbox").html();
    // while (content.includes("Đang tải nội dung chương") == 1) {
    //     browser.callJs(`document.location='/truyen/${book}';`, 1000);
    //     browser.callJs(`document.querySelector(".blk-item2").click();`, 1000);
    //     let doc = browser.html()
    //     var content = doc.select("#content-container .contentbox").html();
    // }
    // browser.close();
    browser.launchAsync(url);
    browser.callJs(`document.location='/truyen/${book}';`, 4000);
    browser.waitUrl(".*?index.php.*?sajax=readchapter.*?", 10000);

    var retry = 0;
    while (retry < 5) {
        sleep(1000);
        let doc = browser.html();
        var text = doc.select("#content-container > .contentbox").text();
        if (text.indexOf('Đang tải nội dung chương') === -1) {
            doc.select("i[hd]").remove();
            content = doc.select("#content-container > .contentbox").html();
            break;
        }
        retry++;
    }

    browser.close();
    content = content.replace(/<span(.*?)>(.*?)<\/span>/g, "")
        .replace(/id\=\"(.*?)\"/g, '')
        .replace(/p\=\"(.*?)\"/g, '')
        .replace(/onclick\=\"pr\(this\)\;\"/g, '')
        .replace(/isname\=\"true\"/g, '')
        .replace(/namelen\=\".*?\"/g, '')
        .replace(/asynctask\=\".*?\"/g, '')
        .replace(/style\=\".*?\"/g, '')
        .replace(/<\/i><i h="(h|s|c)(.*?)\" t=\"(h|s|c)(.*?)\"(.*?)<\/i>/gim, '</i>')
        .replace(/<i t="(h|s|c)(.*?)\" h=\"(h|s|c)(.*?)\"(.*?)>(.*?)<\/i>/gim, "")
        .replace(/<i(.*?)h=\"(.*?)t=\"(.*?)\"(.*?)<\/i>/g, "$3")
        .replace(/<i(.*?)t=\"(.*?)\"(.*?)<\/i>/g, "$2")
        .replace(/\·\·\·\·\·\·/g, ".")
        .replace(/\s/g, "")
    return content;
}
