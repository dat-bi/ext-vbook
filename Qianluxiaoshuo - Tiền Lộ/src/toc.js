function execute(url) {
// https://www.qianluxiaoshuo.com/yuedu/725.html
// https://www.qianluxiaoshuo.com/0/725/index.html
    var bookId = url.match(/\d+/g)
    var data = [];
    let response = fetch("https://www.qianluxiaoshuo.com/0/" + bookId +"/index.html");
    if (response.ok) {
        let doc = response.html('gbk');
        let el = doc.select(".chapters li")
        for (let i = 0;i < el.size(); i++) {
            var e = el.get(i)
            let isVip = e.select("em").text();
            let name = e.select("a").text();
            if(isVip === "VIP" ){
                name = "[VIP] " + name;
            }
            data.push({
                name: name ,
                url:"https://www.qianluxiaoshuo.com" + e.select("a").attr("href"),
                host: "http://www.qianluxiaoshuo.com"
            })
        }
        return Response.success(data);
    }
    return null;
}