load('libs.js');
load('config.js');

function execute(url) {
    var response = fetch(url);
    if (response.ok) {
        var doc = response.html();
        return Response.success({
            name: $.Q(doc, '#wrapper > main > div:nth-child(5) > h1').text(),
            cover: randomCover(),
            author: 'Sưu tầm',
            description: 'Nghiêm cấm trẻ em dưới 18 tuổi',
            detail: '111',
            host: BASE_URL
        });
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
    return 'https://truyenheo.org' + '/anh/anhgaifull/' + getRandomInt(1, 4500) + '.jpg';
}