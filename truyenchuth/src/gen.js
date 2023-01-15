function execute(url, page) {
    let response = fetch("https://truyenchuth.com" + url);
    if (response.ok) {
        let doc = response.html();
        const data = [];
        doc.select("#loadmore > div").forEach(e => {
            data.push({
                name: e.select(".w3-col.s7.m7.l7.row-info > div > h3 > a").text(),
                link: e.select(".w3-col.s7.m7.l7.row-info > div > h3 > a").attr("href"),
                cover: e.select(".w3-col.s2.m2.l2.row-image > div > a > img").attr("src"),
                description: null,
                host: "https://truyenchuth.com/"
            })
        });

        return Response.success(data)
    }
    return null;
}