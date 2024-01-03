load('libs.js');
load('1qidian.js');
load('1fanqie.js');
load('169shu.js');
load('1uukanshu.js');
load('1ptwxz.js');
// load('1html5.js');
function execute(url) {
    var data;
    if (url.includes("sangtac")) {
        if (url.includes("qidian")) {
            data = getDetailQidian(url);
        } else {
            url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, STVHOST)
            data = getDetailStv(url);
        }
    } else {
        if ((url.includes("fqnovel") || url.includes("fanqie"))) {
            url = STVHOST + "/truyen/fanqie/1/" + url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, "").match(/\d+/g)[0];
            data = getDetailStv(url);
        } else if (url.includes("69shu")) {
            data = getDetail69shu(url);
        } else if (url.includes("html5")) {
            data = getDetailHtml5(url);
        } else if (url.includes("piaotian")) {
            data = getDetailPtwxz(url);
        } else if (url.includes("qidian")) {
            url = STVHOST + "/truyen/qidian/1/" + url.match(/\d+/g)[0];
            data = getDetailQidian(url);
        }
    }
    return Response.success(data);

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
    // if (url.includes("fanqie")) {
    //     let idBook = url.match(/\d+/g)[1];
    //     let json = fetch("http://localhost:9999/info?book_id=" + idBook).json()
    //     let book_info = json.data.data;
    //     let a_gen = JSON.parse(book_info.category_schema)
    //     a_gen.forEach(e => {
    //         genres.push({
    //             title: e.name,
    //             input: "http://localhost:9999/reading/bookapi/new_category/landing/v/?category_id=" + e.category_id + "&offset={{page}}&sub_category_id&genre_type=0&limit=10&source=front_category&front_page_selected_category&no_need_all_tag=true&query_gender=1",
    //             script: "gen_fanqie.js"
    //         })
    //     });
    //     suggests[0] = {
    //         title: "Truyện cùng tác giả:",
    //         input: author,
    //         script: "search.js"
    //     }
    // }
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


