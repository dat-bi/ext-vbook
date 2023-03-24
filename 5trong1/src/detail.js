load('libs.js');
function execute(url) {
    if (url.includes("sangtac") != 1) {
        url = STVHOST + "/truyen/fanqie/1/" + url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, "").match(/\d+/g)[0]
    }
    url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, STVHOST)
    let response = fetch(url + '/');
    if (response.ok) {
        let doc = response.html();
        let author = doc.html().match(/Tác giả:.*?\s+(.*?)\s*</);
        if (author) author = author[1];
        let des = doc.select(".blk:has(.fa-water) .blk-body").html();
        let _detail = 'Tên gốc : ' + doc.select("#oriname").text() + '<br>' + doc.select(".blk:has(.fa-info-circle) > div:nth-child(4)").text() + '<br>' + doc.select(".blk:has(.fa-info-circle) > div:nth-child(3)").text();

        return Response.success({
            name: toCapitalize(doc.select("#book_name2").first().text()),
            cover: doc.select(".container:has(#book_name2) img").first().attr("src"),
            author: author || 'Unknow',
            description: des,
            detail: _detail,
            ongoing: true,
            host: ""
        });
    }
    return null;
}
function toCapitalize(sentence) {
    const words = sentence.split(" ");

    return words.map((word) => {
        return word[0].toUpperCase() + word.substring(1);
    }).join(" ");
}