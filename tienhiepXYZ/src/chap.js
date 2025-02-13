function execute(url) {
    let response = fetch(url).html();
    let txt = response.select("#chapter-content > div");
        txt.select("a").remove()
        txt.select("div").remove()
        txt.select("footer").remove()
        txt.select("script").remove()
        return Response.success(txt);
}