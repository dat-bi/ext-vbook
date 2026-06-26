function execute(url) {
    var browser = Engine.newBrowser();
    browser.setUserAgent(UserAgent.android());

    browser.launchAsync(url);

    browser.waitUrl([".*?alicesw.com/home/chapter/info.*?"], 4000);

    let doc = browser.html(3000);
    browser.close();

    doc.select("h3").remove();
    var htm = doc.select(".read-section").html();
    return Response.success(htm);
}