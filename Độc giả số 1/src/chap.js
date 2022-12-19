function execute(url) {


    let response = fetch("https://docgiaso1.com/app/manga/controllers/cont.getChapter.php",{
        method: "GET",
        queries: { //Query String Parameter
            chapter :url.match(/\d+/g)[1],
            mode: "vertical",
            quality : "high",
            hozPageSize: "1"
        }
        // body:{} formdata
    });
    if (response.ok) {
        var json1 = response.json().html
        var doc = Html.parse(json1.replace(/\r\n/g,""))
        let data = [];
        doc.select("div.iv-card").forEach(e => {
            let img = e.attr("data-url");
            data.push(img);
        });
        return Response.success(data);
    }
    return null;
}