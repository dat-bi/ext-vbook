function execute(url, page) {
    if(!page) page = '1';

    let response = fetch("http://www.yikushan.com"+ url +page+"/");
    if (response.ok) {
        let doc = response.html();
        const data = [];
        let next = doc.select("a:contains(>>)").first().attr("href").slice(0, -1).split(/[/ ]+/).pop()
        console.log(next)
		doc.select(".item ").forEach(e => {
            data.push({
                name: e.select("dl dt a").first().text().replace("《","").replace("》",""),
                link: "http://www.yikushan.com" + e.select("dl dt a").attr("href"),
                cover: e.select(".image a img").attr("data-original"),
                description: e.select(".btm").text(),
                host: "http://www.yikushan.com"
            })
        });


        return Response.success(data,next)
    }
    return null;
}