function execute(input) {
    let doc = Html.parse(input);
    const data = [];
    doc.select("a").forEach(e => {
        data.push({
            name: e.select("img").attr("title"),
            link: "http://14.225.254.182/truyen/qidian/1/" + e.attr("href").match(/\d+/g)[0] + "/",
            cover: "https:" + e.select("img").attr("src"),
            description: e.select(".author-item-coll").text(),
        })
    });
    return Response.success(data)
}