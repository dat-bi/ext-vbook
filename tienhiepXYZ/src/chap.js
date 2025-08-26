function execute(url) {
    let response = fetch(url).html();
    let txt = response.select("#chapter-c");
        txt.select("a").remove()
        txt.select("strong").remove()
        txt.select("script").remove()
        return Response.success(txt.html());
}