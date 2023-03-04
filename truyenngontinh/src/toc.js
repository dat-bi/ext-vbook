
function execute(url) {
    var response = fetch(url);
    if (response.ok) {
        var doc = response.html();
        var data = [];

        data.push({
            name: "Phần 1",
            url: url,
            host: "https://truyenngontinh.net"
        })
        var elems = doc.select('body > div.logo2 > center:nth-child(7) > div a');
        elems.forEach(function(e) {
            data.push({
                name: e.text(),
                url: e.attr('href'),
                host: "https://truyenngontinh.net"
            })
        });

        return Response.success(data);
    }
    return null;
}