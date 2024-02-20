load('config.js');
function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    let response = fetch(url);
    if (response.ok) {
        var doc = response.html()
        let data = [];
        doc.select(".inner-entry-content p img").forEach(e => {
            let img = e.attr("src").replace("/wp-content/uploads/2022/09/15/credit509e62cbedaafe86.jpg","").replace("https://hacamchicac.com/tt.jpg","");
            if(img){
                data.push(img);
            }
        });
        return Response.success(data);
    }
    return null;
}