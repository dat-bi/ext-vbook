function execute(url) {
    
    var host = 'http://www.60ks.net';
    url = url.replace('http://m.60ks.net/book/', 'http://www.60ks.net/ks/1/').replace('index.html', '');
        if(url.slice(-1) !== "/")
        url = url + "/";
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html('gbk');
        const data = [];
        doc.select("#chapterlist > ul > li > a").forEach(e => data.push({
            name: e.text(),
            url: host + e.attr('href'),
            host: host
        }));
        return Response.success(data);
    }
    return null;
}