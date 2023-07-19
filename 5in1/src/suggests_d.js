function execute(input) {
    let doc = Html.parse(input);
    let books = [];
    console.log(doc)
    doc.select("a").forEach(e => {
        books.push({
            name: e.text(),
            link: "https://sangtacviet.vip/truyen/qidian/1/" + e.attr("href").match(/\d+/g)[0],
            cover: "https://bookcover.yuewen.com/qdbimg/349573/1033956677/180.webp",
        })
    });
    return Response.success(books);
}