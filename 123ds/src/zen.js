function execute(url, page) {
    
    // if(!page) page = '1';

    // let response = fetch(url +page+"/");
    // if (response.ok) {
    //     let doc = response.html();
    //     const data = [];
    //     let next = doc.select("a:contains(>>)").first().attr("href").slice(0, -1).split(/[/ ]+/).pop()
    //     console.log(next)
	// 	doc.select(".item ").forEach(e => {
    //         data.push({
    //             name: e.select("dl dt a").first().text().replace("《","").replace("》",""),
    //             link: "http://www.kanshuwu.org" + e.select("dl dt a").attr("href"),
    //             cover: e.select(".image a img").attr("data-original"),
    //             description: e.select("dl dd").text(),
    //             host: "https://520banxia.com"
    //         })
    //     });


    //     return Response.success(data,next)
    // }
    // return null;
}