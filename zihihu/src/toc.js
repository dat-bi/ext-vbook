function execute(url) {
        let browser = Engine.newBrowser();
        var doc = browser.launch(url, 10000)
        browser.close()
        let el = doc.select(".List-item .ContentItem-title");
        console.log(el)
        const data = [];
        for (let i = 0; i< el.size(); i++) {
            let e = el.get(i);
            data.push({
            name: e.select("a").text(),
            url: 'https:'+ e.select("a").attr("href")
        });
        }

        return Response.success(data.reverse());

}