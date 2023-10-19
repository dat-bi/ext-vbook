const BASE_URL = 'https://buondua.com'
function execute(url, page) {
    if (!page) page = "0";

    let response = fetch(url, {
        method: "GET",
        queries: {
            start: page
        }
    });
    if (response.ok) {
        let doc = response.html();
        let data = [];
        doc.select(".blog.columns > .items-row.column").forEach(e => {
            data.push({
                name: e.select(".item-thumb img").attr("alt"),
                link: BASE_URL +  encodeURIComponent(e.select(".page-header a").first().attr("href")).replace("%2F","/") ,
                cover: e.select(".item-thumb img").attr("src"),
                host: BASE_URL
            })
        });

        var next = /\?start=(\d+)/.exec(doc.select(".pagination-next").attr("href"));
        if (next) next = next[1];
        else next = "0";
        return Response.success(data, next)
    }
    return null;
}