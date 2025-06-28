load('config.js');

function execute(url, page) {
    if (url.slice(-1) !== "/") url = url + "/";
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL)
    if (!page) {
        page = '';
    } else {
        page = `page/${page}/`
    };
    let newUrl =  url + page
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

        let next = doc.select('span.current + a').text();
        if (next) return Response.success(data, next);

        return Response.success(data);
    }
    return null;
}
