function execute(input) {
    let doc = Html.parse(input);
    console.log(doc)
    const data = [];
    doc.select("a").forEach(e => {
        data.push({
            name: e.text().replace(/\\|\"/g,"").replace(/<\/a>n/g,""),
            link: e.attr("href").replace(/\\|\"/g,""),
            cover:  "https://i.postimg.cc/T2WtdmBM/5BdXa90.webp",
        })
    });
    return Response.success(data)
}