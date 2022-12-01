function execute(url) {
    var browser = Engine.newBrowser();
    browser.setUserAgent(UserAgent.android());
    var doc = browser.launch(url, 5000);
    browser.close()
    // let response = fetch(url,{
    //         headers: {
    //             'user-agent': UserAgent.android(),
    //         },
    //         method : "GET"
    //     });
    if (doc) {
        let pages = [];
        doc.select("select[name=pageselect] option").forEach(e => {
            pages.push(e.attr('value'));
        });
        return Response.success(pages);
    }
    return null;
}