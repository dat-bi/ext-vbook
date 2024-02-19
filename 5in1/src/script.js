load('libs.js');
function execute(url) {
    var browser = Engine.newBrowser()
    browser.launch("https://my.qidian.com/author/9639927/")
    browser.callJs(`
    function myFunction() {
    // Get cookie value
    var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)_csrfToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    var box1Element = document.querySelector('body > div:nth-child(2) > div.author-content-wrapper > div.author-content > h2:nth-child(1)')
    box1Element.innerHTML=cookieValue;
    console.log("Cookie value:", cookieValue);
}

// Call the function when the page is loaded
window.onload = function() {
    myFunction();
};
myFunction();
`, 100)
let doc = browser.html()
console.log(doc.select)
    browser.close()
    // var _csrfToken = cookies.match(/_csrfToken=(.*?);/)[1];
    // log(_csrfToken)
    // let t = "https://m.qidian.com/majax/rank/reclist?gender=male&pageNum=2&_csrfToken=VGcimHqXEuhHG54BcVuOK2ho1WukStoalTmFIRZ6"
    // log(t.match(/_csrfToken(.*?)$/)[0])
    return null;
}
// https://www.qidian.com/rank/yuepiao/?source=m_jump/
// https://m.qidian.com/rank/yuepiao/