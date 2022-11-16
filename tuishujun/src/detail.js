function execute(url) {
    //https://pre-api.tuishujun.com/api/listBookScoreByBook?book_id=634&type=long&page=1&pageSize=50&sort_field=reply_number&sort_value=desc
    let bookId = url.match(/\d+/)[0]
    console.log(bookId)
    let response = fetch('https://pre-api.tuishujun.com/api/getBookDetail?book_id='+bookId);
    if (response.ok) {
        let json = response.json();
        var bookA = json.data
    }
        return Response.success({
            name: bookA.title,
            cover: bookA.cover,
            author:  bookA.author_nickname,
            description: bookA.info,
            detail: bookA.source_name,
            host: "https://www.tuishujun.com"
        });
}