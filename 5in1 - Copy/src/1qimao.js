// function getDetailQimao(url) {
//     let uid = url.match(/\d+/);
//     let sign = CryptoJS.MD5(`id=${uid}d3dGiJc651gSQ8w1`)
//     let response = fetch(`https://api-bc.wtzw.com/api/v5/book/detail?id=${uid}&sign=${sign}`, {
//         method: "GET", // GET, POST, PUT, DELETE, PATCH
//         headers: {
//             "platform": "android",
//             "app-version": "71900",
//             'application-id': 'com.kmxs.reader',
//             'sign': `${CryptoJS.MD5("app-version=71900application-id=com.kmxs.readerplatform=androidd3dGiJc651gSQ8w1")}`,
//             'user-agent': 'webviewversion/0'
//         },
//     })
//     let $ = response.json().data.book
//     //return Response.success($)
//     return {
//         name: $.title,
//         cover: $.thumb_image_link,
//         author: $.author_uid,
//         description: $.intro,
//         detail: $.latest_chapter_title,
//         ongoing: $.is_over == 0 ? true : false,
//         host: "https://api-bc.wtzw.com"
//     };
// }
function getChapQimao(url) {
    let nurl = url.replace('https://api-bc.wtzw.com/', '');
    let sign = CryptoJS.MD5(`${nurl.replace("&", "")}d3dGiJc651gSQ8w1`)
    let response = fetch(`https://api-ks.wtzw.com/api/v1/chapter/content?${nurl}&sign=${sign}`, {
        method: "GET", // GET, POST, PUT, DELETE, PATCH
        headers: {
            "platform": "android",
            "app-version": "71900",
            'application-id': 'com.kmxs.reader',
            'sign': `${CryptoJS.MD5("app-version=71900application-id=com.kmxs.readerplatform=androidd3dGiJc651gSQ8w1")}`,
            'user-agent': 'webviewversion/0'
        },
    })
    let $ = response.json()
    let txt = CryptoJS.enc.Base64.parse($.data.content).toString()
    let iv = txt.slice(0, 32)
    let content = decrypt(txt.slice(32), iv).trim()
        .replace(/\n/g, '<br>')
    return content;
}
const decrypt = function (data, iv) {
    let key = CryptoJS.enc.Hex.parse('32343263636238323330643730396531')
    iv = CryptoJS.enc.Hex.parse(iv)
    let HexStr = CryptoJS.enc.Hex.parse(data)
    let Base64Str = CryptoJS.enc.Base64.stringify(HexStr)
    let decrypted = CryptoJS.AES.decrypt(Base64Str, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    })
    return decrypted.toString(CryptoJS.enc.Utf8)
}
function getTocQimao(uid) {
    // let uid = url.match(/\d+/);
    let sign = CryptoJS.MD5(`id=${uid}d3dGiJc651gSQ8w1`)
    let response = fetch(`https://api-ks.wtzw.com/api/v1/chapter/chapter-list?id=${uid}&sign=${sign}`, {
        method: "GET", // GET, POST, PUT, DELETE, PATCH
        headers: {
            "platform": "android",
            "app-version": "71900",
            'application-id': 'com.kmxs.reader',
            'sign': `${CryptoJS.MD5("app-version=71900application-id=com.kmxs.readerplatform=androidd3dGiJc651gSQ8w1")}`,
            'user-agent': 'webviewversion/0'
        },
    })
    let $ = response.json()
    let list = []
    $.data.chapter_lists.forEach((chapter) => {
        list.push({
            name: chapter.title,
            url: `chapterId=${chapter.id}&id=${uid}`,
            host: "https://api-bc.wtzw.com"
        })
    })
    return list
}