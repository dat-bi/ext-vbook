function execute(url, page) {
    if(url.slice(-1) === "/")
        url = url.slice(0, -1)
	url = url.replace('m.tigerfp.com', 'www.tigerfp.com');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        const data = [];
        //#main > div.news-wrap.wrap-box > div.update-wrap > div > table > tbody
        let ele1 = doc.select(".all-book-list li")
        ele1.forEach(e => {
            data.push({
                name: e.select(".book-info h4").first().text(),
                link: "http://www.tigerfp.com" + e.select(".book-info h4 a").attr("href"),
                cover: e.select(".book-img img").attr("data-original"),
                description: e.select(".intro").text(),
                host: "http://www.tigerfp.com"
            })
        }); 
        return Response.success(data)
    }
    return null;
}