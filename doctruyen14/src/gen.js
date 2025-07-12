load('config.js');

function execute(url, page) {
    if (url.slice(-1) !== "/") url = url + "/";
    if (!page) {
        page = '';
    } else {
        page = `page/${page}/`
    };
    let newUrl =  url + page
    console.log(newUrl)
    let response = fetch(newUrl);
    if (response.ok) {
        let doc = response.html();
        let data = [];
        doc.select(".post").forEach(e => {
            let name = e.select('.entry-title').text();
            data.push({
                name: name,
                link: e.select('h2 a').attr('href'),
                cover: "https://i.postimg.cc/T2WtdmBM/5BdXa90.webp",
                host: BASE_URL
            })
        })

        let next = doc.select('.current + a').text();
        return Response.success(data, next);
    }
    return null;
}
