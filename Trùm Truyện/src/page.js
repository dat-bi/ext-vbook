
function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let el = doc.select(".page-item:nth-last-child(2) .page-link").text();
        if(!el){return Response.success(url  + "?page=" + 1); }
        const data = [];
        for (let i = 1; i <= el; i++) {
            data.push(url  + "?page=" +  i)
        }
        return Response.success(data);
    }
    return null;
}