function execute(url) {
    var browser = Engine.newBrowser();
    browser.setUserAgent(UserAgent.android());

    browser.launchAsync(url);

    browser.waitUrl([".*?alicesw.com/home/chapter/info.*?"], 4000);

    let doc = browser.html(3000);
    browser.close();

    var htm = doc.select(".content_txt").html();
    return Response.success(htm);
}