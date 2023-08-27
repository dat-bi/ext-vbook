load('config.js');
function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();

        let coverImg = doc.select('meta[property="og:image"]').attr("content");
        let title = doc.select('meta[property="og:title"]').attr("content");
        let status = doc.select('meta[property="og:novel:status"]').attr("content");
        let newChap = doc.select(".update-text a").text();
        let author = doc.select('meta[property="og:novel:author"]').attr("content");
        let category = doc.select('meta[property="og:novel:category"]').attr("content");
        let updateTime = doc.select('meta[property="og:novel:update_time"]').attr("content").replace(/\d\d:\d\d:\d\d/g, "");

        let genres = [];
        doc.select(".tag font").forEach(e => {
            genres.push({
                title: e.text()
            });
        });
        return Response.success({
            host: BASE_URL,
            ongoing: doc.select(".tag span").last().text().indexOf("连载中") >= 0,
            name: title,
            cover: coverImg,
            author: author,
            detail: "Thể loại: " + category + '<br>' + "Tình trạng: " + status + '<br>' + newChap + '<br>' + "Thời gian cập nhật: " + updateTime,
            description: doc.select(".intro").html(),

            genres: genres,
            suggests: [
                {
                    title: "Đề cử",
                    input: doc.select("#comment .good-wrap").html(),
                    script: "suggest.js"
                }
            ],
        });
    }
    return null;
}
