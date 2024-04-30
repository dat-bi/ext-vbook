
function execute(key, page) {
    if (!page) page = '1';
    key = encodeURIComponent(key)
    url = "https://myreadingmanga.info/search/?search=" + key
    var browser = Engine.newBrowser();
    browser.setUserAgent(UserAgent.android());
    var doc = browser.launch(url, 5000);
    browser.close()
        let data = [];
        let e = doc.select(".results-by-facets div").first()

            let coverImg = e.select(".p_content img").attr("data-src");
            data.push({
                name: e.select(" .p_title  a").text(),
                link: e.select(" .p_title a").attr("href"),
                cover: coverImg,
            });
    
        return Response.success(data);

}