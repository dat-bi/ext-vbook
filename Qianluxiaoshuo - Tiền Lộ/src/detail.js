function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html('gbk');
        let coverImg = doc.select("td:nth-child(1) > div:nth-child(1) > img").first().attr("src");
        console.log(coverImg)
        if (coverImg.startsWith("/")) {
            coverImg = "https://www.qianluxiaoshuo.com" + coverImg;
        }
        let author = doc.select("span:nth-child(2) > a:nth-child(1)").first().text();
        return Response.success({
            name: doc.select("div:nth-child(2) > span:nth-child(1)").text(),
            cover: coverImg,
            author: author,
            description: doc.select(".tabcontent > div:nth-child(1) > div:nth-child(2)").text(),
            detail: "作者：" + author + "<br>" +doc.select(".tabcontent > div:nth-child(1) > p").text(),
            host: "https://www.qianluxiaoshuo.com"
        });
    }
    return null;
}