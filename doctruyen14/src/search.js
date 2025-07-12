function execute(key, page) {
        if (!page) {
        page = '';
    } else {
        page = `page/${page}/`
    };
    var key = encodeURIComponent(key)
    let response = fetch("https://doctruyen14.vip/"+page + "?s=" + key + "&submit=T%C3%ACm")
    if (response.ok) {
        let doc = response.html();
        let data = [];
        doc.select(".post").forEach(e => {
            let name = e.select('.entry-title').text();
            data.push({
                name: name,
                link: e.select('h2 a').attr('href'),
                cover: "https://i.postimg.cc/T2WtdmBM/5BdXa90.webp",
            })
        })
                let next = doc.select('span.current + a').text();
        if (next) return Response.success(data, next);

        return Response.success(data,next);
    }
    return null;
}
