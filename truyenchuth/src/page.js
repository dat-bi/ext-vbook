function execute(url) {
    var doc = Http.get(url).html()
    var page = doc.select(".last a").attr("href").match(/p\=\d+/g)[0].match(/\d+/g)[0];
    var data = []
    for(let  i = 1; i <= page; i++){
        data.push( url + "?p=" + i)
    }
    return Response.success(data);
}