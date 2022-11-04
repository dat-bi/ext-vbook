function execute(url, page) {
    let response = fetch("https://www.82zw.com/" + url + '/');
    if (response.ok) {
        let doc = response.html("gbk");
        const data = [];
        doc.select("#newscontent ul li").forEach(e => {
            data.push({
                name: e.select(".s2").first().text().replace("《","").replace("》",""),
                link: 'https://www.82zw.com/' + e.select(".s3 a").attr("href"),
                cover: "https://www.82zw.com/files/article/image/64/64799/64799s.jpg",
                description: null,
                host: "https://www.82zw.com/"
            })
        });

        return Response.success(data)
    }
    return null;
}