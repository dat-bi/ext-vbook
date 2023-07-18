load('libs.js');
function execute(url) {
    var data;
    if (url.includes("sangtac") != 1) {
        if ((url.includes("fqnovel") == 1 || url.includes("fanqie") == 1)) {
            url = STVHOST + "/truyen/fanqie/1/" + url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, "").match(/\d+/g)[0];
            data = getDetailStv(url);
        } else if (url.includes("69shu") == 1) {
            data = getDetail69shu(url);
        } else if (url.includes("html5") == 1) {
            data = getDetailHtml5(url);
        } else if (url.includes("ptwxz") == 1) {
            data = getDetailPtwxz(url);
        }

    } else {
        url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, STVHOST)
        data = getDetailStv(url);
    }
    return Response.success(data);

}
function getDetailStv(url) {
    let response = fetch(url + '/');
    let doc = response.html();
    var author = doc.select("i.cap").attr("onclick").replace(/location=\'\/\?find\=&findinname\=(.*?)\'/g, "$1")
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
        // var browser = Engine.newBrowser();
        // let host = "http://" + browser.launch("http://net.ipcalf.com/", 2000).select("#list").text().match(/\d+\.\d+\.\d+\.\d+/)[0] + ":9999"
        // browser.close();
        let host = "http://localhost:9999"
        let id_fanqie = url.match(/\d+/g)[1];
        // console.log(host + "/info?book_id=" + id_fanqie)
        let json = fetch(host + "/info?book_id=" + id_fanqie).json()
        let book_info = json.data.data;
        let a_gen = JSON.parse(book_info.category_schema)
        a_gen.forEach(e => {
            genres.push({
                title: e.name,
                input: host + "/reading/bookapi/new_category/landing/v/?category_id=" + e.category_id + "&offset={{page}}&sub_category_id&genre_type=0&limit=10&source=front_category&front_page_selected_category&no_need_all_tag=true&query_gender=1",
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
