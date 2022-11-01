function execute(url) {
    // var browser = Engine.newBrowser();
    // browser.setUserAgent(UserAgent.android());
        let response = fetch(url, {
            headers: {
                'user-agent': UserAgent.android()
            }
        });
    url = url.replace('www.','wap.')
    if(url.slice(-1) !== "/")
        url = url + "/";
    let doc = response.html();
    // var doc = browser.launch(url, 1000);
    // browser.close()
        let coverImg = "https://www.jhssd.com/" + doc.select(".block_img2 img").first().attr("src");
        let author = doc.select(".block_txt2 > p:nth-child(4)").first().text();
        return Response.success({
            name: doc.select(".block_txt2 h2 a").text(),
            cover: coverImg,
            author: author,
            description: doc.select(".intro_info").text(),
            detail: doc.select(".block_txt2 > p:nth-child(7)").text(),
            host: "https://wap.jhssd.com"
        });

}