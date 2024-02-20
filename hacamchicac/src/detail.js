load('config.js');
function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    if(url.includes("-chap-")){
        url = fetch(url).html().select(" pre a:nth-child(2)").attr("href")
    }
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let coverImg = doc.select(".inner-entry-content p img").first().attr("src");
        return Response.success({
            name: doc.select(".inner-entry-content span>strong").first().text().replace("Tên truyện:",""),
            cover: coverImg,
            author:  doc.select(".inner-entry-content p:nth-child(5) > span > strong").first().text(),
            
            description: doc.select(".inner-entry-content p").html()
        });
    }
    return null;
}