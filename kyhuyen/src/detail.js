function execute(url) {
    var doc = Http.get(url).html();
    if (doc) {
        return Response.success({
            name: doc.select("#content > div.content > div.container.no-bottom.story-detail > div:nth-child(1) > div.media.m-b-15 > div.media-body > h1 > span").text(),
            cover: doc.select("#content > div.content > div.container.no-bottom.story-detail > div:nth-child(1) > div.media.m-b-15 > div.media-left > img").attr("src"),
            host: "https://kyhuyen.com",
            author: doc.select("#content > div.content > div.container.no-bottom.story-detail > div:nth-child(1) > div.media.m-b-15 > div.media-body > p:nth-child(3) > a").text(),
            description: doc.select("#content > div.content > div.container.no-bottom.story-detail > div:nth-child(2) > div.hide-if-mobile.para > p").html(),
            detail: doc.select("#content > div.content > div.container.no-bottom.story-detail > div:nth-child(1) > div.media.m-b-15 > div.media-body > p:nth-child(2) > a").text(),
            ongoing: doc.select("#content > div.content > div.container.no-bottom.story-detail > div:nth-child(1) > div.media.m-b-15 > div.media-body > p:nth-child(5)").html().indexOf("Đang tiến hành") >= 0
        });
    }
    return null;
}
