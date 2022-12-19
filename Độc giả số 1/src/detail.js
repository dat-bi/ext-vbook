function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let coverImg = doc.select("#primaryimage").first().attr("src");
        return Response.success({
            name: doc.select(".anisc-detail > h1").first().text(),
            cover: "https://docgiaso1.com/"+ coverImg,
            author: null,
            description: doc.select(".anisc-detail > div.sort-desc > div.description").html(),
            detail: doc.select(".anisc-detail > div.sort-desc > div.genres").html(),
            host: "https://docgiaso1.com/",
            ongoing: doc.select(".anisc-detail > div.manga-name-or").html().indexOf("Đang cập nhật") >= 0
        });
    }

    return null;
}