load('libs.js');
function execute(url, page) {
    if (!page) page = '1';
    var browser = Engine.newBrowser()
    let doc = browser.launch(STVHOST + url + '&p=' + page, 5000)
    browser.close()
    let next = doc.select(".pagination").select("li.active + li").text()
    let el = doc.select("#searchviewdiv a.booksearch")
    let data = [];
    function toCapitalize(sentence) {
        const words = sentence.split(" ");
        let result = "";
        for (let i = 0; i < words.length; i++) {
            if (i > 0) result += " ";
            result += words[i][0].toUpperCase() + words[i].substring(1);
        }
        return result;
    }
    el.forEach(e => {
        let img = e.select("img").first().attr("src");
        if (img.startsWith('//')) img = img.replace('//', 'https://')
        data.push({

            name: toCapitalize(e.select(".searchbooktitle").first().text()),
            link: e.select("a").first().attr("href"),
            cover: img,
            description: e.select(".info span:nth-child(3)").text() + " Chương - " + e.select(".searchbookauthor").first().text(),
            host: STVHOST

        })
    });
    return Response.success(data, next)
}