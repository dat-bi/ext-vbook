load('libs.js');
load('config.js');

function execute(url) {
    url = url.replace("m.", "www.").replace(/index.html/g, "") + "/index.html";
    console.log(url)
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();

        var data = [];
        var elems = doc.select('#list > dl:nth-child(2) dd a');
        console.log(elems.size())

        elems.forEach(function (e) {
            data.push({
                name: e.text(),
                url: BASE_URL + e.attr('href')
            })
        });

        return Response.success(data);
    }
    return null;
}