function execute(url) {
    var bookID = fetch(url).html().select("#wrapper").attr("data-manga-id")
    let response = fetch("https://docgiaso1.com/app/manga/controllers/cont.readingList.php",{
        method: "GET",
        queries: { //Query String Parameter
            manga :bookID,
            readingBy: "chap",
        }
        // body:{} formdata
    });
    if (response.ok) {
        var json1 = response.json().html
        // console.log(json1)
        var doc = Html.parse(json1.replace(/\r\n/g,""))
        // console.log(doc)
        let el = doc.select(".chapters-list-ul .reading-item");
        // console.log(el)
        const data = [];
        for (let i = 0; i < el.size() ; i++) {
            let e = el.get(i);
            data.push({
                name: e.select("a").attr("title"),
                url: e.attr("data-id")
            })
        }
        return Response.success(data.reverse());
    }
    return null;
}