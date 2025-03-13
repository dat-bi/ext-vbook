
function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let el = doc.select(".pagination__item.disabled + li a").text();
        if(!el){
            return Response.success([url]); 
        }
        const data = [];
        for (let i = 1; i <= el; i++) {
            let e = i
            data.push(url + "?page=" + i);
        }
        return Response.success(data.reverse());
    }
    return null;
}