// https://cse.google.com/cse?oe=utf8&ie=utf8&source=uds&q=U%E1%BB%91ng%20nh%E1%BA%A7m%20Thu%E1%BB%91c&safe=off&cx=a7862c59c1ca47414&start=0
load('libs.js');
load('config.js');
function execute(key, page) { 
    var key = encodeURIComponent(key)
    var url = "https://www.google.com/search?q="+key+"+site%3Ahttps%3A%2F%2Ftruyensextv.com%2F&sxsrf=ALiCzsa2EDImprPyZ6dPndb3j9RX5ndQ2A%3A1667800234553&ei=qpxoY_aqIbueseMPgf-48A8&ved=0ahUKEwj2p6WEsJv7AhU7T2wGHYE_Dv4Q4dUDCA8&uact=5&oq="+key+"+site%3Ahttps%3A%2F%2Ftruyensextv.com%2F&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQA0oECEEYAUoECEYYAFDeBVjeBWDvCGgBcAB4AIABlgGIAZYBkgEDMC4xmAEAoAEBwAEB&sclient=gws-wiz-serp"
    let response = fetch(url)
    if (response) {
        let doc = response.html();
        let data = [];
        let elems = doc.select("a[href*='url?q=https:']")
        console.log(elems)
        if (!elems.length) return Response.error(key);

        elems.forEach(function(e) {
            var link = $.Q(e, 'a').attr('href').match(/https:\/\/truyensextv.com\/(.*?)\//g)+""
            data.push({
                name: $.Q(e, 'h3').text(),
                cover: randomCover(),
                link: link,
                description: null,
                host: BASE_URL
            })
        })

        return Response.success(data);
    }
    return null;
}
// https://stackoverflow.com/a/1527820
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// (づ｡◕‿‿◕｡)づ
function randomCover() {
    return BASE_URL + '/anh/anhgaifull/' + getRandomInt(1, 4500) + '.jpg';
}