load('config.js');

function execute(data) {
    let doc   = Html.parse(data);
    let books = [];

    // Chọn từng "card" sách
    doc.select("div.mx-auto.flex.flex-col.space-y-2")
       .forEach(card => {
            // Lấy thẻ <a> đầu tiên (liên kết + ảnh)
            let linkEl  = card.select("a.mx-auto").first();
            let imgEl   = linkEl.select("img").first();
            let titleEl = card.select("span.text-xs.font-semibold").first();

            books.push({
                name:        titleEl.text().trim(),
                cover:       imgEl.attr("src"),
                link:        linkEl.attr("href"),
                description: 0,
                host:        BASE_URL
            });
    });

    return Response.success(books);
}
