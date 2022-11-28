load('config.js');

function execute(url, page) {
    if (!page) page = '1';
    const doc = Http.get(BASE_URL + url + '/page/'+ page).html();
    var next = doc.select("span.current + a").first().text()
    const el = doc.select(".row .listpost .col-xs-12")
    size = el.size()
    const data = [];
    for (var i = 0; i < size; i++) {
        var e = el.get(i);
        data.push({
                name: $.Q(e, ' a').text().replace('Truyện Sex:',''),
                link: $.Q(e, ' a').attr('href')+'#gsc.tab=0',
                cover: randomCover(),
                description: null,
                host: BASE_URL
        })
    }
    return Response.success(data,next)
}



// https://stackoverflow.com/a/1527820
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomCover() {
    return 'https://truyenheo.net/' + '/anh/anhgaifull/' + getRandomInt(1, 4500) + '.jpg';
}