function execute(url) {
    //https://pre-api.tuishujun.com/api/listBookScoreByBook?book_id=634&type=long&page=1&pageSize=50&sort_field=reply_number&sort_value=desc
    let bookId = url.match(/\d+/)[0]
    console.log(bookId)
    let response = fetch('https://pre-api.tuishujun.com/api/listBookScoreByBook?book_id='+bookId);
    if (response.ok) {
        let json = response.json();
        console.log(json.data.total)
        let total = json.data.total;
    var page = Math.round(total/50);
    console.log(page)
        var data = [];
        for (let i = 1; i <= page; i++) {
            data.push({
                name: "页" + i,
                url: 'https://pre-api.tuishujun.com/api/listBookScoreByBook?book_id='+bookId+'&page='+i,
                host: null
            });
        }
    }
    return Response.success(data);
}