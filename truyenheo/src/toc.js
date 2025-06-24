load('config.js');
function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL)
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let data = [];

        data.push({
            name: "Phần 1",
            url: url,
            host: BASE_URL
        })

        let elems = doc.select('.bai-viet-box a.post-page-numbers');
        elems.forEach(function(e) {
            data.push({
                name: e.text(),
                url: e.attr('href'),
                host: BASE_URL
            })
        });

        return Response.success(data);
    }
    return null;
}