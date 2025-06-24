load('config.js');
function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL)
    let response = fetch(url);
    let genres = [];
    if (response.ok) {
        let doc = response.html();
    let tag = doc.select('table > tbody > tr:nth-child(5) > td:nth-child(2) a ');
        tag.forEach(e => {
            genres.push({
                title: e.text(),
                input: e.attr("href").replace(BASE_URL,""),
                script: "gen.js"
            })
        })
        let suggests = [
            {
                title: "Truyện cùng tác giả:",
                input: doc.select('body > div.logo2 > div:nth-child(14) > div strong').html() ||doc.select('body > div.logo2 > div:nth-child(13) > div strong').html() ,
                script: "suggests_author.js"
            }
        ];
        return Response.success({
            name: doc.select('.bai-viet-box h1 > a').text(),
            cover: "https://i.postimg.cc/T2WtdmBM/5BdXa90.webp",
            author: doc.select('table > tbody > tr:nth-child(3)').text().replace('Tác giả', '').trim() || 'Sưu tầm',
            description: 'Nghiêm cấm trẻ em dưới 18 tuổi',
            detail: '',
            genres: genres,
            suggests: suggests,
            host: BASE_URL
        });
    }
    return null;
}


