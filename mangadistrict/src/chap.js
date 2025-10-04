load('config.js');
function execute(url) {
    // url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL)
    // let response = fetch(url);
    // if (!response.ok) {
    //     return null;
    // }
    // let doc = response.html();
    // var el = doc.select(".reading-content img");
    // var data = [];
    // for (var i = 0; i < el.size(); i++) {
    //     var e = el.get(i);
    //     data.push(e.attr("src").replace("https://cdn.mangadistrict.com/assets/publication/media/image/001.jpg",""));   
    // }
    var data = [];
    for (var i = 0; i < el.size(); i++) {
        var e = el.get(i);
        data.push(e.attr("src").replace("https://cdn.mangadistrict.com/assets/publication/media/image/001.jpg",""));   
    }
    return Response.success(data);
}
