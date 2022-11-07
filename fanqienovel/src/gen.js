function execute(url, page) {
    if (!page) page = '0';
    let response = fetch(url+page+"&limit=12&book_type=0&iid=730526249649336&aid=1967&app_name=novelapp&version_code=307&version_name=3.0.7.32");
    if (response.ok) {
        var data = response.json().data;
        var allBook = data.cell_view.book_data
        const book = [];
        for (var i = 0; i < allBook.length; i++) {
            var item = allBook[i]        
            book.push({
                name: item.book_name,
                link: "https://fanqienovel.com/page/"+item['book_id'],
                cover: item['thumb_url'],
                description: item['rank_score'],
                host: "https://fanqienovel.com"
            })
        }
        var next = parseInt(page) + 1;
        return Response.success(book, next.toString())      
    }
    return Response.success(json);
}