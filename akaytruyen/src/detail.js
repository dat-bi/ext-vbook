function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        return Response.success({
            name: doc.select('h3.story-name').text(),
            cover: doc.select('meta[property="og:image"]').attr("content"),
            author: "Akay Hau",
            description: doc.select(".story-detail__top--desc.px-3").text()
        });
    }

    return null;
}