function execute(key, page) {
    // gb18030, gbk uri encode
    // '打更人' --> '%B4%F2%B8%FC%C8%CB'
    // https://www.qianluxiaoshuo.com/modules/article/search.php?searchkey=%C1%A2&searchtype=all
    var gbkEncode = function(s) {
        load('gbk.js');
        return GBK.encode(s);
    }
    var url = 'https://www.qianluxiaoshuo.com/modules/article/search.php?searchkey=' + gbkEncode(key) +'&searchtype=all';
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html('gbk');
        let el = doc.select(".c_row")
        let data = [];
        el.forEach(e => data.push({
            name: e.select(".c_subject ").text(),
            link: 'https://www.qianluxiaoshuo.com' + e.select(".c_subject > a").attr("href"),
            cover: 'https://www.qianluxiaoshuo.com' + e.select(".fl a img").first().attr("src"),
            description: e.select(".c_tag").first().text(),
            host: "https://www.qianluxiaoshuo.com"
        }))
            return Response.success(data);
    }
    return null;
}