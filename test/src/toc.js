function execute(url) {
var browser = Engine.newBrowser();
    // browser.setUserAgent(UserAgent.android());
    browser.block([".*?uk.*?"]);
    browser.launch(url, 5000);
    browser.close()
    var ul = browser.urls();
    var id =ul.match(/uk\\u003d.*?\\u0026/g)[0].replace(/uk\\u003d|\\u0026/g,'')
    var url = 'https://mbd.baidu.com/webpage?tab=article&num=80&uk='+id+'&source=pc&type=newhome&action=dynamic&format=json'
    console.log(url)
    const data = [];
    let response = fetch(url);
    if (response.ok) {
        let json = response.json();
        let lisst = json.data.list;
        let listlength = lisst.length
        for (let i = 0; i < listlength; i++) {
            let name = lisst[i].itemData.title;
            let link = lisst[i].itemData.url;
        data.push({
                name: name,
                url: link
        })
        }
    }
    if (data.length === 0) return null;
    return Response.success(data);
}