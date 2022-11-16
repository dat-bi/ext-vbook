function execute(url) {
    if(url.slice(-1) === "/")
        url = url.slice(0, -1)
    const data = [];
    let bookID = url.split(/[/ ]+/).pop();
    url = "https://api.yousuu.com/api/book/" + bookID +"/comment";
    let response = fetch(url);
    if (response.ok) {
        let json = response.json();
        let total = json.data.total;
        let page  = parseInt(total/20, 10); 
        if(total/20>page)
            page++;

        for (let i = 1; i <= page; i++) {
            data.push({
                name: "页" + i,
                url: "https://api.yousuu.com/api/book/" + bookID +"/comment?page=" +i,
                host: "https://www.yousuu.com"
            });
        }
    }

    if (data.length === 0) return null;
    return Response.success(data);

}