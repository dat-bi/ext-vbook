function execute(url, page) {
    if (!page) page = '0';
    let response = fetch(url);
    if (response.ok) {
        var data = response.json().data;
        var allBook2 = data.book_info
        const book = [];
        for (var i = 0; i < allBook2.length; i++) {
            var item2 = allBook2[i]        
            book.push({
                name: item2.book_name,
                link: "https://fanqienovel.com/page/"+item2['book_id'],
                cover: item2['thumb_url'],
                description: item2['score'],
                host: "https://fanqienovel.com"
            })
        }
        
        if (data.has_more == 1){
            var next = parseInt(page) + 1;
        }
        return Response.success(book, next.toString())      
    }
    return Response.success(json);
}