load('libs.js');
load('1qidian.js');
load('169shu.js');
load('269shu.js');
load('1ptwxz.js');
function execute(url) {
    var data;
    if (url.includes("sangtac")) {
        url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, STVHOST)
        data = getDetailStv(url);
    } else {
        if (url.includes("69shu")) {
            data = getDetail69shu(url);
        } else if (url.includes("69yuedu")) {
            data = getDetail69yuedu(url);
        } else if (url.includes("piaotia")) {
            data = getDetailPtwxz(url);
        }
        else if (url.includes("qidian")) {
            url = STVHOST + "/truyen/qidian/1/" + url.match(/\d+/g)[0];
            data = getDetailQidian(url);
        }
    }
    return Response.success(data);

}

function getDetailStv(url) {
    let response = fetch(url + '/');
    // let doc = response.html();
    var browser = Engine.newBrowser() // Khởi tạo browser
    let doc = browser.launch(url, 7000) // Mở trang web với timeout, trả về Document object
    browser.close() // Đóng browser khi đã xử lý xong
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


