function execute(url) {
    var doc = Http.get(url).html();
    var content = doc.select(".trangcon .box").html()
    content = content.replace(/\n/g,'<br>')
    content = content.replace(/&nbsp;/g,'')
    content = content.replace(/Bạn đang đọc truyện (.*?)\.html/g,'')
    return Response.success(content); 
}
