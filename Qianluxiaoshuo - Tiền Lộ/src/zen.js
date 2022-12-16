function execute(url, page) {
    if(!page) page = '1';
    let response = fetch( "https://www.qianluxiaoshuo.com/" + url +page+ ".html");
    if (response.ok) {
        let doc = response.html("gbk");
        const data = [];
        let next = doc.select(".pagelink strong+a").text()
        console.log(next)
		doc.select("tbody > tr:nth-child(1)~tr").forEach(e => {
            data.push({
                name: e.select("td:nth-child(1) a").last().text(),
                link: "https://www.qianluxiaoshuo.com/" + e.select("td:nth-child(1) a").last().attr("href"),
                cover: 'http://www.yikushan.com/static/yikushan/nocover.jpg',
                description: e.select("td:nth-child(3) > a").text() +"__"+ e.select("td:nth-child(5)").text()  ,
                host: "https://www.qianluxiaoshuo.com"
            })
        });


        return Response.success(data,next)
    }
    return null;
}