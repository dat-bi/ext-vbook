function execute(url) {
    var response = fetch(url, {
        method: "GET",
        headers: {
            // 'user-agent': UserAgent.android(), // set chế độ điện thoại
            // "bbb": "yyy"     //'content-type': 'text/html; charset=UTF-8' //type
        } //Query String Parameter thì dùng cái này
    }) 
    // if(response.ok){ // Check request success (status >= 200 && status < 300)
        let doc = response.html() // Trả về response request dạng Document object
        console.log(doc)
            return Response.success(content);
    // }
    // return null
}
// https://www.qidian.com/rank/yuepiao/?source=m_jump/
// https://m.qidian.com/rank/yuepiao/