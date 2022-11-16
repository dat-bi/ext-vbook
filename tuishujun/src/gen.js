function execute(key, page) {
    if (!page) page = '1';
    let response = fetch('https://pre-api.tuishujun.com/api/'+key+'?page='+page+'&pageSize=20');

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
                description: "综合评分: " +  e.score,
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