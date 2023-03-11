function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let coverImg = "https://mysdy.manga9k.com/covers/"+ url.replace("https://lkdttzz.com/truyen/","") +".jpg"
        return Response.success({
            name: doc.select("main > div.top-part > div > div.col-12.col-md-8 > div.series-name-group > span > a").first().text(),
            cover: coverImg,
            author: null,
            description: doc.select("#app > main > div.container > div > div:nth-child(1) > div > div > section > main > div.bottom-part > div > div.summary-wrapper.col-12 > div").html(),
            detail: doc.select("#app > main > div.container > div > div:nth-child(1) > div > div > section > main > div.top-part > div > div.col-12.col-md-8 > div.series-information > div:nth-child(1)").html(),
            ongoing: doc.select("#app > main > div.container > div > div:nth-child(1) > div > div > section > main > div.top-part > div > div.col-12.col-md-8 > div.series-information > div:nth-child(2) > span.info-name").html().indexOf("Đang tiến hành") >= 0
        });
    }

    return null;
}