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
function get_device() {
    if (!localStorage.getItem("device")) {
        let response = fetch("https://api.langge.cf/");
        let doc = response.request.headers.cookie
        if(doc == undefined){
            return undefined
        } else(
            doc = doc.replace("secretKey2=","")
        )
        localStorage.setItem("device", doc)
    }
    return localStorage.getItem("device")
}