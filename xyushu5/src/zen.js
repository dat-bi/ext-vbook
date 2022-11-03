function execute(url, page) {
    if(!page) page = '1';

    let response = fetch("https://www.xyushu5.com/" +url + "_"+page+"/");
    if (response.ok) {
        let doc = response.html('gbk');
        const data = [];
        let next = doc.select("a:contains(>>)").first().attr("href").slice(0, -1).split(/[/ ]+/).pop();
        
		doc.select("#articlelist > ul:nth-child(3) li ").forEach(e => {
            

            data.push({
                name: e.select(".l02 a").first().text(),
                link: 'https://m.xyushu5.com/novel/' + e.select(".l02 a").last().attr("href").match(/\d+/g)[1] + '.html' ,
                cover: 'http://www.yikushan.com/static/yikushan/nocover.jpg',
                description: e.select(".l01").text() + e.select(".l07").text(),
                host: "https://m.xyushu5.com"
            })
        });


        return Response.success(data,next)
    }
    return null;
}