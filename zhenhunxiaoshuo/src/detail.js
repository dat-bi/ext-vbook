function execute(url) {
    let response = fetch(url);
    if (response.ok) {

        let doc = response.html();
        return Response.success({
            name: doc.select("body > div.focusbox > div > h1").text(),
            cover: "https://raw.githubusercontent.com/dat-bi/ext-vbook/main/anh-bia/1.png",
            description: doc.select("body > div.focusbox > div > div").html(),
            detail: null
        });
    }
    return null;
}