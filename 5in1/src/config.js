function get_csrfToken() {
    if (!localStorage.getItem("_csrfToken")) {
        var browser = Engine.newBrowser()
        browser.launch("https://my.qidian.com/author/9639927/", 10000)
        let url1 = browser.urls()
        browser.close()
        var _csrfToken = url1.match(/_csrfToken(.*?)\\u0026/g)[0].replace("\\u0026", "").replace("\\u003d", "=")
        localStorage.setItem("_csrfToken", _csrfToken)
    }
    return localStorage.getItem("_csrfToken")
}