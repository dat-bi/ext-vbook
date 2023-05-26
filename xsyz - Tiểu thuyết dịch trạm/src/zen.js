function execute(url, page) {
    if(!page) page = 1;

    let response = fetch("https://www.xsyz.cc/xiaoshuo/"+ url + "-" + page + ".html");
    if (response.ok) {
        let doc = response.html();
        const data = [];
        let next = parseInt(page) + 1;
        console.log(next)
		doc.select(".item ").forEach(e => {
            data.push({
                name: e.select("h3 > a").text().replace("《","").replace("》",""),
                link: "https://www.xsyz.cc" + e.select("h3 > a").attr("href"),
                cover: e.select( " a > img").attr("src"),
                description: e.select(".item  div > p:nth-child(3) > a").text(),
                host: "https://www.xsyz.cc"
            })
        });


        return Response.success(data,next)
    }
    return null;
}