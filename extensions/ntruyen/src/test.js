function execute(url) {
    var browser = Engine.newBrowser(); // Khởi tạo browser
    var doc = browser.launch(url, 5000);
    if (doc) {
        console.log("URL: " + url);
        console.log("HTML length: " + doc.html().length);
        console.log("Body snippet: " + doc.select("body").text().substring(0, 500));
        console.log("Script tags count: " + doc.select("script").size());
    } else {
        console.log("Document is null");
    }
    let js = JSON.stringify(browser.urls());
    console.log("URLs intercepted: " + js);
    browser.close();
    return "";
}

