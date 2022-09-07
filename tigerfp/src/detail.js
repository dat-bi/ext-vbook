function execute(url) {
    let response = fetch(url.replace('m.','www.'));
    if (response.ok) {
        let doc = response.html('gbk');
        return Response.success({
            name: doc.select("#list > div.book-main > div.book-text > h1").text(),
            cover: doc.select("#fengmian > a > img").attr("src"),
            author: doc.select("#list > div.book-main > div.book-text > span").text(),
            description: doc.select("#list > div.book-main > div.book-text > div.intro").text(),
            detail: doc.select("#list .book-main .book-text .tag span").get(0).text(),
            host: "https://www.tigerfp.com"
        });
    }
    return null;
}