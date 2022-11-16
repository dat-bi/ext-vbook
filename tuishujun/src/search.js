function execute(key, page) {
    if (!page) page = '1';
    let response = fetch('https://pre-api.tuishujun.com/api/searchBook?', {
        method: "GET",
        queries: {
            search_value : key,
            sort_field : "hot_value",
            page: "page",
            pageSize : "10",
        }
    });

    if (response.ok) {
        let json = response.json();
        let data = [];
        console.log(json.data.total)
        let total = json.data.total;
        let books = json.data.data;
        let totalPage = Math.round(total/20);
        books.forEach(e => {
            data.push({
                name: e.title,
                link: "https://www.tuishujun.com/books/" + e.book_id,
                cover:  e.cover,
                description: "综合评分: " +  e.score +"<br>"+"(" + e.info + ")",
                host: "https://www.tuishujun.com/"
            });
        });

        var next = "";
        if(next < totalPage) 
            next  =  parseInt(page, 10) + 1;

        return Response.success(data, next.toString());
    }
    return null;
}