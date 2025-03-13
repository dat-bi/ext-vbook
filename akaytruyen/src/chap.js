function execute(url) {
    let response = fetch(url).html();
    let txt = response.select("#chapter-content").html();
        return Response.success(txt);
}