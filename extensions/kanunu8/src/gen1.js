function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html('gbk');
        const data = [];
		doc.select(".mulu-list a[href], table:nth-child(7) > tbody tr td a[href]").forEach(e => {
            let link = e.attr("href");
            if(isBookLink(link))
                data.push({
                    cover:'https://raw.githubusercontent.com/dat-bi/ext-vbook/main/assets/anh-bia/0.png',
                    name: e.text(),
                    link: toUrl(link),
                    description: '',
                    host: "https://www.kanunu8.com"
                });
        });
        return Response.success(data)
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
