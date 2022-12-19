function execute(url) {
    var doc = Http.get(url).html();
    if (doc) {
        return Response.success({
            name: doc.select(".book_info h1").text(),
            cover: "https://i.pinimg.com/564x/f7/67/c4/f767c4ba03e6efa15642e4dadfc2b8a9.jpg",
            host: "https://tuchangioi.net",
            author: doc.select(".item-list p").get(0).text(),
            description: doc.select(".description").html(),
            detail: null,
            ongoing: null
        });
    }
    return null;
}