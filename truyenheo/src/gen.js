load('config.js');

function execute(url, page) {
    page = page || '1';
    let newUrl = BASE_URL + url + (page === '1' ? '/' : '/page/{0}/'.replace('{0}', page));
    let response = fetch(newUrl);
    if (response.ok) {
        let doc = response.html();
        let data = [];
        doc.select(".noibat").forEach(function (e) {
            let name = e.select('a > strong').text();
            if (name == '') return;
            data.push({
                name: name,
                link: e.select('a').attr('href'),
                cover: "https://i.postimg.cc/T2WtdmBM/5BdXa90.webp",
                description: e.select('span').text(),
                host: BASE_URL
            })
        })

        let next = doc.select('span.page-numbers.current + a').text();
        if (next) return Response.success(data, next);

        return Response.success(data);
    }
    return null;
}
