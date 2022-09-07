function execute(url, page) {

    if(!page) page = '1';
    if(url.slice(-1) !== "/")
        url = url + "/";
    let response = fetch(url +  page + ".html");
    if (response.ok) {
        let doc = response.html();
        const data = [];
        let next = ""
        next = doc.select("a.next").attr("href").replace(".html","").split(/[/ ]+/).pop();
		doc.select("ul.j_bookList li.g_col_6").forEach(e => {
            data.push({
                name: e.select("h2").first().text(),
                link: e.select("a.c_strong").first().attr("href"),
                cover: e.select("img").first().attr("_src"),
                description: e.select("p.ell._tags span").first().text(),
                host: "http://www.shubaowen.com"
            })
        });
        return Response.success(data, next);
    }
    return null;
}