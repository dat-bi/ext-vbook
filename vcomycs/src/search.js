function execute(key) {
    var doc = Http.post("https://vcomycs.net/wp-admin/admin-ajax.php")
    .headers({
        "content-type" : "application/x-www-form-urlencoded; charset=UTF-8"
    }).
    params({
        "action": "searchtax",
        "keyword": key
    }).string()
    var json = JSON.parse(doc).data
    var listBook = []
    for(var i in json){
        var book = json[i]
    	listBook.push({
        name: book.title,
        link: book.link,
        cover: book.img,
        description: "Star: " + book.star + ", Vote: " + book.vote,
        host: "https://vcomycs.net"      
        });
    }
    return Response.success(listBook)
}