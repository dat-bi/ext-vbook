load('libs.js');
function execute(url) {
    // var browser = Engine.newBrowser()
    // browser.launch("https://my.qidian.com/author/9639927/", 5000)
    // let url1 = browser.urls()
    // log(url1)
    // browser.close()
    // var _csrfToken = url1.match(/_csrfToken(.*?)\\u/g)[0].replace("\\u003d", "=").replace("\\u", "")
    //     log(_csrfToken)
    // let json = fetch(url).json()
    // console.log(json.data.bookStatus)
        let response = fetch("https://truyen.tangthuvien.vn/");
    var htm =  response.headers
    console.log(JSON.stringify(htm))
    // var _csrfToken = cookies.match(/_csrfToken=(.*?);/)[1];
    // log(_csrfToken)
    // let t = "https://m.qidian.com/majax/rank/reclist?gender=male&pageNum=2&_csrfToken=VGcimHqXEuhHG54BcVuOK2ho1WukStoalTmFIRZ6"
    // log(t.match(/_csrfToken(.*?)$/)[0])
    return null;
}
// https://www.qidian.com/rank/yuepiao/?source=m_jump/
// https://m.qidian.com/rank/yuepiao/