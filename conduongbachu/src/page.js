
function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let el = doc.select("#chapter-range option");
        const data = [];
        for (let i = 0; i < el.size(); i++) {
            let e = el.get(i);
            data.push("https://conduongbachu.net/?start=" + e.attr("value").split(",")[0] + "&end=" + e.attr("value").split(",")[1] + "&old_first=false"
            );
        }
        return Response.success(data.reverse());
    }
    return null;
}