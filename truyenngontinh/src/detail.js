function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, "https://truyenngontinh.net")
    var response = fetch(url);
    if (response.ok) {
        var doc = response.html();
        return Response.success({
            name : doc.select("body > div.logo2 > div:nth-child(4) > h1 > center > a").text(),
            cover : 'https://raw.githubusercontent.com/dat-bi/ext-vbook/main/anh-bia/1.png',
            detail: null,
            host : "https://truyenngontinh.net",
            author : null,
            description : null,
        });
    }
    return null;
}
