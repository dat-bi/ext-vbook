// function execute(url) {
//     var doc = Http.get(url).html();
//     var el =doc.select(".phantrangcon .post-page-numbers");
//     const data = [];
//     for (var i = 0; i < el.size();i++ ) {
//         var e = el.get(i);
//         data.push({
//             name: e.text(),
//             url:  e.select('a' ).attr("href"),
//             host: "https://tuoinung.com"
//         })
//     }
//     data[0].url = url
//     return Response.success(data); 
// }

load('libs.js');
load('config.js');

function execute(url) {
    var response = fetch(url);
    if (response.ok) {
        var doc = response.html();
        var data = [];

        data.push({
            name: "Phần 1",
            url: url,
            host: BASE_URL
        })

        var elems = $.QA(doc, '.phantrangcon a.post-page-numbers');
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