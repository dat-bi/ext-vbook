load('config.js');
function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html('gbk');
        let author = "作者："+doc.select("#novelMain div:nth-child(2) > a").first().text();
        return Response.success({
            name: doc.select("#nr_body > nav > ul > li:nth-child(2)").text(),
            cover: "https://i.postimg.cc/T2WtdmBM/5BdXa90.webp",
            author: author,
            description: doc.select("#novelMain > div:nth-child(6) > div > pre").text(),
            detail: doc.select(".article_info_td").text(),
            host: "https://m.xyushu5.com"
        });
    }
    return null;
}