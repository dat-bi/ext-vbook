function execute(url, page) {
    if (!page) page = '1';

    var doc = Http.get(url + page).html();

    if (doc) {
        var el = doc.select("#content > div.content > div.container.no-bottom.story-list .one-third-responsive ");
        var novelList = [];
        var next = page;
        if(next <=50 ){
            next =page +1
        }
        for (var i = 0; i < el.size(); i++) {
            var e = el.get(i);
            novelList.push({
                name: e.select(" div.media.m-b-30 > div.media-body > h4 > a:nth-child(2)").text(),
                link: e.select(" div.media.m-b-30 > div.media-body > h4 > a:nth-child(2)").first().attr("href"),
                description: e.select("div.media.m-b-30 > div.media-body > p:nth-child(3) > a").text(),
                cover: e.select("div.media.m-b-30 > div.media-left > a > img").first().attr("src"),
                host: "https://kyhuyen.com",
            });
        }
        return Response.success(novelList, next);
    }
    return null;
}
