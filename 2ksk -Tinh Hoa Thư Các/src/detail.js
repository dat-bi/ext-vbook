function execute(url) {
    url = url.replace('www.','m.')
    if(url.slice(-1) !== "/")
        url = url + "/";
    var browser = Engine.newBrowser();
    browser.setUserAgent(UserAgent.android());
    //     let response = fetch(url, {
    //         headers: {
    //             'user-agent': UserAgent.android()
    //         }
    //     });
    // let doc = response.html();
    var doc = browser.launch(url, 4000);
    browser.close()
        let coverImg =  doc.select(".block_img2 img").first().attr("src");
        let author = doc.select(".block_txt2 > p:nth-child(4)").first().text();
        return Response.success({
            name: doc.select(".block_txt2 h2 a").text(),
            cover: "https://m.2ksk.com/files/article/image/0/5/5s.jpg",
            author: author,
            description: doc.select(".intro_info").text(),
            detail: doc.select(".block_txt2 > p:nth-child(7)").text(),
            host: "https://m.2ksk.com"
        });

}