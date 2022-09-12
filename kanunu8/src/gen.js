function execute(url, page) {
    // if(url.slice(-1) === "/")
    //     url = url.slice(0, -1)
    if(!page) page='1'
    // console.log(url)+ page + ".html"
    let response = fetch(url+ page + ".html");
    if (response.ok) {
        let doc = response.html('gbk');
        const data = [];
        let next = doc.select("body > div:nth-child(1) > table:nth-child(9) > tbody > tr > td:nth-child(2) > table:nth-child(2) > tbody > tr > td").select('strong + a').text()
		doc.select("body > div:nth-child(1) > table:nth-child(9) > tbody > tr > td:nth-child(2) > table:nth-child(1) > tbody > tr:nth-child(1) > td > table > tbody tr").forEach(e => {
            let link = e.select("a").first().attr("href");
            if(link.includes(".html"))
                data.push({
                    cover:'https://www.kanunu8.com/files/terrorist/201102/1633/img.jpg',
                    name: e.select("a").first().text(),
                    link: "https://www.kanunu8.com" + link,
                    description: '',
                    host: "https://www.kanunu8.com"
                });
        });
        return Response.success(data, next)
    }
    return null;
}