load('config.js');
function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    let response = fetch(url);
    if (response.ok) {
        var doc = response.html()
        let data = [];
        doc.select(".text-left img").forEach(e => {
            let img = e.attr("src").replace("https://i.ibb.co/j39fz57/CREDIT.jpg", "");
            if(img){
                data.push(img);
            }
        });
        return Response.success(data);
    }
    return null;
}