load('config.js');
function execute(url) {
    const doc = Http.get(url).html();
    return Response.success({
        name: doc.select(".trangcon h1").first().text().replace('Truyện Sex: ',''),
        cover: randomCover(),
        author: null,
        description: 'TRUYỆN 18+',
        host: BASE_URL
    });
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomCover() {
    return 'https://truyensextv.com' + '/anh/anhgaifull/' + getRandomInt(1, 4500) + '.jpg';
}