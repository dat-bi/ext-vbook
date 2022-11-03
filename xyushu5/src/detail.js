function execute(url) {
    var bookId = url.replace(/https:\/\/m.xyushu5.com\/novel\/|https:\/\/www.xyushu5.com\/read/g,'').replace('.html','').replace('/','')
    let response = fetch('https://www.xyushu5.com/read/'+bookId+'/');
    if (response.ok) {
        let doc = response.html('gbk');
        let coverImg = doc.select(".img_in img").first().attr("src");
        console.log(coverImg)
        if (coverImg.startsWith("/")) {
            coverImg = "https://www.xyushu5.com" + coverImg;
        }
        let author = "作者："+doc.select("#info > div.infotitle > span > a").first().text();
        return Response.success({
            name: doc.select(".infotitle > h1").text(),
            cover: coverImg,
            author: author,
            description: doc.select("#aboutbook").text(),
            detail: doc.select("#info > div.infotitle > span > span").text(),
            host: "https://m.xyushu5.com"
        });
    }
    return null;
}