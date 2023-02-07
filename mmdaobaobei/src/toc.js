function execute(url) {
    var doc = Http.get(url).html();
    var data = [];
    data.push({name: 0,url: url,})
    var elems = doc.select('.wrap_box > div.wrap_fl > div.wrap_article > div.page-normal a').last().attr('href');
    elems = elems.replace(/\..*?\_/g,"").replace(/\.html/g,"")
    if (!elems.length) {
        elems = 0
    }
    for(let e = 1; e <= elems; e++)
        data.push({
            name: e,
            url: url.replace(".html","") + "_" + e + ".html",
        })
    return Response.success(data);
}