function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        return Response.success({
            name: doc.select('.my-3  h2.fw-bold').text(),
            cover: "https://conduongbachu.net/assets/images/banner-book.webp",
            author: "Akay Hau",
            description: doc.select(".my-3").text()
        });
    }

    return null;
}