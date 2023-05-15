function execute(url, page) {
    if (!page) page = '2';

    let response = fetch("https://www.shushuwuxs.com" + url + page + ".html");
    console.log("https://www.shushuwuxs.com" + url + page + ".html")
    if (response.ok) {
        let doc = response.html();
        const data = [];
        let next = doc.select("a:contains(下一页)").first().attr("href").match(/\d+/g)[0]
        console.log(next)
        doc.select("#main > div.novelslist2 > ul li").first().remove();
        doc.select("#main > div.novelslist2 > ul li").forEach(e => {
            data.push({
                name: e.select("span.s2> a").first().text().replace("《", "").replace("》", ""),
                link: "https://www.shushuwuxs.com" + e.select("li > span.s2> a").attr("href") ,
                cover: "https://i.imgur.com/5BdXa90.png",
                description: e.select("span.s7").first().text(),
                host: "https://www.shushuwuxs.com"
            })
        });


        return Response.success(data, next)
    }
    return null;
}