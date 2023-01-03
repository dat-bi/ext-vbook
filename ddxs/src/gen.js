function execute(url, page) {
    let response = fetch("https://www.ddxs.com/" + url + '/');
    if (response.ok) {
        let doc = response.html();
        const data = [];
        doc.select("#content dd").forEach(e => {
            data.push({
                name: e.select("a").first().text(),
                link: 'https://www.ddxs.com/' + e.select("a").first().attr("href"),
                cover: "https://raw.githubusercontent.com/dat-bi/ext-vbook/main/anh-bia/1.png",
                description: null,
                host: "https://www.ddxs.com/"
            })
        });

        return Response.success(data)
    }
    return null;
}