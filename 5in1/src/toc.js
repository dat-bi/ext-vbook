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
            data = getToFA(url)
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


function getToFA(url) {
    if (url.slice(-1) !== "/") url = url + "/";
    let host = url.split('/truyen/')[0];
    const source = url.split('/')[4];
    const bookId = url.split('/')[6];
    console.log(host + " " + source + " " + bookId)
    let list = [];
    let newurl = `https://fanqienovel.com/api/reader/directory/detail?bookId=${bookId}`   // /api/reader/directory/detail?bookId=
    let response = fetch(newurl)
    if (response.ok) {
        let doc = response.json()
        // let text = doc.match(/INITIAL_STATE__\=(.*?)\;/g)[0].replace("INITIAL_STATE__=", "").replace(";", "")
        // console.log(text)
        // let json = JSON.parse(text);
        // let el = json.page.chapterListWithVolume
        let el = doc.data.chapterListWithVolume
         el.forEach((q) => {
        q.forEach((e) => {
            list.push({
                name: e.title,
                url: url + e.itemId
            })
        })
         })
    }

    return list;

}
