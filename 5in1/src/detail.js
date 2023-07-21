function execute(url) {
    var data;
    if (url.includes("sangtac") != 1) {
        if ((url.includes("fqnovel") || url.includes("fanqie"))) {
            url = STVHOST + "/truyen/fanqie/1/" + url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, "").match(/\d+/g)[0];
            data = getDetailStv(url);
        } else if (url.includes("69shu")) {
            data = getDetail69shu(url);
        } else if (url.includes("html5")) {
            data = getDetailHtml5(url);
        } else if (url.includes("ptwxz")) {
            data = getDetailPtwxz(url);
        } else if (url.includes("qidian")) {
            url = STVHOST + "/truyen/qidian/1/" + url.match(/\d+/g)[0];
            data = getDetailQidian(url);
        }

    } else {
        if (url.includes("qidian")) {
            data = getDetailQidian(url);
        } else {
            url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, STVHOST)
            data = getDetailStv(url);
        }
    }
    return Response.success(data);

}
function getDetailQidian(url) {
    let idBook = url.match(/\d+/g)[1];
    url = 'https://www.qidian.com/book/' + idBook + '/';
    console.log(url)
    let response = fetch(url);
    let doc;
    if (!response.ok) return null;
    if (response.status == 202) {
        let browser = Engine.newBrowser();
        browser.launch(url, 15 * 1000);
        doc = browser.html();
    }
    else {
        doc = response.html();
    }
    let cover1 = "https:" + $.Q(doc, '#bookImg img').attr('src');
    let author = doc.select('meta[property="og:novel:author"]').attr("content")
    let a_gen = doc.select('.book-author .author-name > a');
    let genres = [
        {
            title: a_gen.get(0).attr("title"),
            input: "https:" + a_gen.get(1).attr("href").replace(/-subCateId\d+/g, "-page{page}-orderId10"),
            script: "gen2.js"
        },
        {
            title: a_gen.get(1).attr("title"),
            input: "https:" + a_gen.get(1).attr("href") + "-page{page}-orderId10/",
            script: "gen2.js"
        }
    ]
    let tag = doc.select('#j-intro-honor-tag > p a');
    tag.forEach(e => {
        genres.push({
            title: e.text(),
            input: "https:" + e.attr("href") + "-page{page}-orderId10/",
            script: "gen2.js"
        })
    })
    let suggests = [
        {
            title: "Truyện cùng tác giả:",
            input: doc.select('.other-works .book-wrap-new>a'),
            script: "suggests_author.js"
        },
        {
            title: "Truyện đề cử:",
            input: doc.select('.book-weekly-hot-rec.weekly-hot-rec > div') + doc.select("#bookImg img"),
            script: "suggests_d.js"
        }
    ];
    return {
        name: $.Q(doc, '#bookName').text(),
        cover: cover1,
        author: author,
        description: $.Q(doc, '#book-intro-detail').html(),
        host: STVHOST,
        genres: genres,
        suggests: suggests,
    };
}
function getDetailStv(url) {
    let response = fetch(url + '/');
    let doc = response.html();
    var author = doc.select("i.cap").attr("onclick").replace(/location=\'\/\?find\=&findinname\=(.*?)\'/g, "$1");
    let des = doc.select(".blk:has(.fa-water) .blk-body").html();
    let _detail = doc.select("#inner > div.container.px-md-4.px-sm-0.px-0 > div:nth-child(5) .blk-body");
    _detail.select("a").remove();
    let suggests = [
        {
            title: "Truyện từ các nguồn khác:",
            input: doc.select("#book_name2").first().text(),
            script: "suggests.js"
        }
    ];
    let genres = [];
    if (url.includes("fanqie")) {
        let idBook = url.match(/\d+/g)[1];
        let json = fetch("http://localhost:9999/info?book_id=" + idBook).json()
        let book_info = json.data.data;
        let a_gen = JSON.parse(book_info.category_schema)
        a_gen.forEach(e => {
            genres.push({
                title: e.name,
                input: "http://localhost:9999/reading/bookapi/new_category/landing/v/?category_id=" + e.category_id + "&offset={{page}}&sub_category_id&genre_type=0&limit=10&source=front_category&front_page_selected_category&no_need_all_tag=true&query_gender=1",
                script: "gen_fanqie.js"
            })
        });
        suggests[0] = {
            title: "Truyện cùng tác giả:",
            input: author,
            script: "search.js"
        }
    }
    let data = {
        name: doc.select("#oriname").text(),
        cover: doc.select(".container:has(#book_name2) img").first().attr("src"),
        author: author || 'Unknow',
        description: des,
        detail: _detail.html().replace(/\n/g, "<br>"),
        ongoing: true,
        host: STVHOST,
        genres: genres,
        suggests: suggests,
    }
    return data;
}
function getDetail69shu(url) {
    var host = 'https://www.69shu.com';
    url = url.replace(/.+\.69shu\.com\/txt\/(\d+)\.htm/, 'https://www.69shu.com/txt/$1.htm');

    let response = fetch(url);
    let doc = response.html('gbk');
    let data = {
        name: $.Q(doc, 'div.booknav2 > h1 > a').text(),
        cover: $.Q(doc, 'div.bookimg2 > img').attr('src'),
        author: $.Q(doc, 'div.booknav2 > p:nth-child(2) > a').text().trim(),
        description: $.Q(doc, 'div.navtxt > p').html(),
        detail: $.QA(doc, 'div.booknav2 p', { m: x => x.text(), j: '<br>' }),
        host: host
    }
    return data;
}
function getDetailPtwxz(url) {
    var host = 'https://www.ptwxz.com';

    var response = fetch(url);
    var doc = response.html('gb2312');

    var author = $.QA(doc, '#content table table td', { f: x => /作.*者：/.test(x.text()), m: x => x.text().replace(/作.*者：/, '').replace('<br', '').trim(), j: ' ' });
    var category = $.QA(doc, '#content table table td', { f: x => /类.*别：/.test(x.text()), m: x => x.text().replace(/类.*别：/, '').replace('<br', '').trim(), j: ' ' });
    var cover = $.Q(doc, '#content table table a > img[align][hspace][vspace]').attr('src');
    var description = $.Q(doc, '#content table table div[style]:not([id]):not([onclick])', { remove: 'span, a' }).html();
    description = cleanHtml(description);
    let data = {
        name: $.Q(doc, '#content h1').text(),
        cover: cover,
        author: author,
        description: description,
        detail: String.format('作者: {0}<br>类别: {1}', author, category),
        host: host
    }
    return data
}
function getDetailHtml5(url) {
    const bookidRegex = /bookid=(\d+)/;
    const match = url.match(bookidRegex);
    const bookid = match[1];
    let url2 = "https://bookshelf.html5.qq.com/qbread/api/novel/adbooks/bookinfo?bookid=" + bookid
    let response = fetch(url2, { "headers": { "Referer": "https://bookshelf.html5.qq.com/qbread/adread/catalog" } });
    let doc = response.json();
    let book = doc.data.bookInfo
    let data = {
        name: book.resourceName,
        cover: book.picurl,
        author: book.author,
        description: book.summary.replace(/\n/g, "<br>"),
        detail: "作者： " + book.author + "<br>" + book.subject,
        ongoing: !book.isfinish,
        host: "https://bookshelf.html5.qq.com"
    }
    return data
}
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