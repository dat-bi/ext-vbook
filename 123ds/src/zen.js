function execute(url, page) {
    url = url.replace('m.123duw.com', 'www.123duw.com');
    if(!page) page = '1';
    let response = fetch("http://www.123duw.com" + url + page +"/");
    if (response.ok) {
        let doc = response.html();
        const data = [];
        let next = doc.select("a:contains(下一页)").first().attr("href").slice(0, -1).split(/[/ ]+/).pop()
        console.log(next)
		doc.select(".DivOuter .DivInner").forEach(e => {
            data.push({
                name: e.select(".DivInner a.Title").first().text().replace("《","").replace("》",""),
                link: e.select(".DivInner a").attr("href"),
               // cover: e.select(".image a img").attr("data-original"),
                description: e.select(".DivSmallInstro a.Black").text(),
                host: "http://www.123duw.com"
            })
        });


        return Response.success(data,next)
    }
    return null;
}