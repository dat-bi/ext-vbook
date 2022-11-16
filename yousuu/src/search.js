function execute(key, page) {
    if (!page) page = '1';
    let response = fetch('https://api.yousuu.com/api/search/', {
        method: "GET",
        queries: {
            value : key,
            page: page,
            type: "title"
        }
    });

    if (response.ok) {
        let json = response.json();
        let data = [];
        console.log(json.data.total)
        let total = json.data.total;
        let books = json.data.books;
        let totalPage = Math.round(total/20);
        books.forEach(e => {
            data.push({
                name: e.title,
                link: "https://www.yousuu.com/book/" + e.bookId,
                cover:  e.cover,
                description: "综合评分: " +  e.score +"(" + e.scorerCount + "人评分)",
                host: "https://www.yousuu.com"
            });
        });

        var next = "";
        if(next < totalPage) 
            next  =  parseInt(page, 10) + 1;

        return Response.success(data, next.toString());
    }
    return null;
}