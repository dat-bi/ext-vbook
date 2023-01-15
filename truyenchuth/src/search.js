function execute(key, page) {
    let response = fetch("https://truyenchuth.com/searching?key=" + key);
    if (response.ok) {
        let doc = response.html();
        const listBook = [];
        doc.select("#list > div.list-story > div.w3-row.list-content>div").forEach(e => {
            listBook.push({
                name: e.select(".w3-col.s7.m7.l7.row-info > div > h3 > a").text(),
                link: e.select(".w3-col.s7.m7.l7.row-info > div > h3 > a").attr("href"),
                cover: e.select(".w3-col.s2.m2.l2.row-image > div > a > img").attr("src"),
                description: null,
                host: "https://truyenchuth.com/"
            })
        });

        return Response.success(listBook)
    }
    return null
}