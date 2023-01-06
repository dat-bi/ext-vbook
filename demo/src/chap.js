function execute(url) {
    var response = fetch(url) // GET equest http return Response  //bình thường dùng cái này
        /*
    var response = fetch(url, {
        method: "POST",    // GET, POST, PUT, DELETE, PATCH
        headers: {
            "aaa": "xxx",    // 'user-agent': UserAgent.android(), // set chế độ điện thoại
            "bbb": "yyy"     //'content-type': 'text/html; charset=UTF-8' //type
        },
        body: {
            "aaa": "xxx",
            "bbb": "yyy"
        }, //form data thì dùng cái này
        queries: { 
            "aaa": "xxx",
            "bbb": "yyy"
        } //Query String Parameter thì dùng cái này
    }) // Full request http với options return Response
        */
    if(response.ok){ // Check request success (status >= 200 && status < 300)
        let doc = response.html() // Trả về response request dạng Document object
        // let doc = response.html(charset) // Trả về response request dạng Document object //Web trung có thể là gbk
        // let text = response.text() // Trả về response request dạng string
        // let text = response.text(charset) // Trả về response request dạng string
        // let json = response.json() // Trả về response request dạng JSONObject
        let text = json._data.vi
        var content = ""
        for(let i = 1; i < text.length - 1; i++){
            content = content + text[i] + "<br><br>"
        }
            return Response.success(content);
    }
    return null
}