const BASE_URL = 'https://buondua.com'
function execute(url) {
    url = decodeURIComponent(url)
    // let id = /https:\/\/buondua.com\/([\w-]+(?:-\w+)*)/.exec(url);
    // if (id) id = id[1];
    // console.log(id)
    // let newUrl = "https://buondua.com/" + id;
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let tags = [];
        let str ='Note: Search theo tag riêng. Tags: '
        doc.select(".article-tags span").forEach(e => {
            tags.push(e.text());
        });
        for (let i = tags.length-1; i >= 0; i--) {
            str += tags[i] + ' ';
        }
        return Response.success({
            name: doc.select(".article-header h1").text(),
            cover: doc.select("div.article-fulltext > p > img").first().attr("src"),
            author: 'Không có Tác Giả',
            description: str,
            host: BASE_URL,
            // url: newUrl
        });
    }
    return null;
}