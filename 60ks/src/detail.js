function execute(url) {
    url = url.replace('www.','m.').replace(/\/ks\/(\d+)\//g, '/book/').replace('index.html', '')
    let response = fetch(url+'/');
    if (response.ok) {
        let doc = response.html('gbk');
        return Response.success({
            name: doc.select("body > div.cover > div.block > div.block_txt2 > h2 > a").text(),
            cover: doc.select("body > div.cover > div.block > div.block_img2 > img").first().attr("src"),
            author: doc.select("body > div.cover > div.block > div.block_txt2 > p:nth-child(4) > a").first().text(),
            description: doc.select("body > div.cover > div.intro_info").text(),
            detail: doc.select("body > div.cover > div.block > div.block_txt2 > p:nth-child(6)").text(),
            host: "http://wwww.60ks.cc"
        });
    }
    return null;
}
