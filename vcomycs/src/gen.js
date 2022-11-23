function execute(url, page) {
    if(!page) page = "1"
    var listBook = []
    if(url.indexOf('page')!=-1){
        // https://vcomycs.net/page/2/
        var doc = Http.get(url + "/" + page).html()
        var books = doc.select(".comic-list .comic-item-box")

        books.forEach(book=>listBook.push({
            name: book.select(".comic-img a").attr("title"),
            link: book.select(".comic-img a").attr("href").replace("https://vcomycs.net",""),
            cover: book.select(".comic-img img").attr("src"),
            description: "Views: " + book.select(".keywords-scroller span").get(1).text() + ", " + "Follow: " + book.select(".follow-count").text(),
            host: "https://vcomycs.net"      
        }))
        if (listBook.length == 0) next = ""; 
        else next = (parseInt(page) + 1).toString();
        return Response.success(listBook,next)
    }
    else{
        var doc = Http.get(url+"/").html()
        if(url.indexOf('nhat')!=-1||url.indexOf('the-loai')!=-1){

            //https://vcomycs.net/nhieu-xem-nhat/
            //https://vcomycs.net/truyen-hot-nhat/

            var books = doc.select(".most-views > .position-relative")

            books.forEach(book=>listBook.push({
                name: book.select("img").attr("alt"),
                link: book.select("a").attr("href").replace("https://vcomycs.net",""),
                cover: book.select("img").attr("src"),
                description: "Views: " + book.select(".cat-score").text().split(' ')[0] + ", " + "Follow: " + book.select(".cat-score").text().split(' ')[1],
                host: "https://vcomycs.net"      
            }))
        }
        else{
            //https://vcomycs.net/  --- hot tháng 
            
            var books = doc.select(".comic-carousel-item")

            books.forEach(book => listBook.push({
                name: book.select("a").attr("title"),
                link: book.select("a").attr("href").replace("https://vcomycs.net",""),
                cover: book.select("img").attr("data-src"),
                description: "",
                host: "https://vcomycs.net"      
            }))
        }
        return Response.success(listBook)
    }
}
// https://vcomycs.net/truyen-tranh/lai-mot-lan-nua-huong-ve-anh-sang/