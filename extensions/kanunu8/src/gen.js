function execute(url, page) {
    if(!page) page='1'
    let response = fetch(url+ page + ".html");
    if (response.ok) {
        let doc = response.html('gbk');
        const data = [];
        let next = doc.select(".book-nav strong + a").text();
        if ((next + "").length === 0) {
            next = doc.select("body > div:nth-child(1) > table:nth-child(9) > tbody > tr > td:nth-child(2) > table:nth-child(2) > tbody > tr > td").select('strong + a').text();
        }
		doc.select("#neirong a[href], body > div:nth-child(1) > table:nth-child(9) > tbody > tr > td:nth-child(2) > table:nth-child(1) > tbody > tr:nth-child(1) > td > table > tbody tr a[href]").forEach(e => {
            let link = e.attr("href");
            if (isBookLink(link))
                data.push({
                    cover:'https://raw.githubusercontent.com/dat-bi/ext-vbook/main/assets/anh-bia/0.png',
                    name: e.text(),
                    link: toUrl(link),
                    description: '',
                    host: "https://www.kanunu8.com"
                });
        });
        return Response.success(data, next)
    }
    return null;
}

function isBookLink(link) {
    link = link + "";
    return link.indexOf("/book") === 0 || link.indexOf("/101/") === 0 || link.indexOf("/tuili/") === 0 || link.indexOf("/wuxia/") === 0 || link.indexOf("/files/") === 0 || link.indexOf("/zt/") === 0;
}

function toUrl(link) {
    link = link + "";
    if (link.indexOf("http") === 0) return link;
    return "https://www.kanunu8.com" + link;
}
