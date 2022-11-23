function execute(key, page) {
    if(!page) page = "1"
    var doc = Http.get("https://truyenkkz.com/tim-kiem/page/" + page + "/?title=" + key).html()
    var books  = doc.select(".theloai-thumlist > li")
    //Console.log(books)
    var listBook = []
    books.forEach(book => listBook.push({
		name: book.select("a").attr("title"),
		link: book.select("a").attr("href"),
		cover: book.select("img").attr("data-src"),
		description: book.select(".text p.crop-text-2").text(),
		host: "https://truyenkkz.com"
	}))
    if (listBook.length == 0) next = ""; 
    else next = (parseInt(page) + 1).toString();
    return Response.success(listBook,next)
}