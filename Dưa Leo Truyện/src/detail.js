load('config.js');
function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    console.log(url)
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();

        // Tên truyện
        var name = "";
        var h1 = doc.select(".card-body h1.card-title").first();
        if (h1 != null) {
            name = h1.text().trim();
        }

        // Ảnh bìa
        var cover = "";
        var img = doc.select(".col-md-3 img.img-fluid").first();
        if (img != null) {
            cover = img.attr("src");
            if (cover != null && cover != "" && cover.indexOf("http") != 0) {
                cover = BASE_URL + cover;
            }
        }

        // Nhóm dịch -> author
        var author = "";
        var teamEl = doc.select("dt:contains(Nhóm dịch) + dd a").first();
        if (teamEl != null) {
            author = teamEl.text().trim();
        }

        // Thể loại
        var genres = [];
        var genreEls = doc.select("dt:contains(Thể loại) + dd a.cate-item");
        for (var i = 0; i < genreEls.size(); i++) {
            var e = genreEls.get(i);
            var gTitle = e.text().trim();
            var gHref = e.attr("href").replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, ''); 

            genres.push({
                title: gTitle,
                input: gHref,       // dùng luôn href làm input
                script: "gen.js"
            });
        }

        // Mô tả: ưu tiên #comicsContent, fallback meta description
        var description = doc.select("meta[name=description]").attr("content");
        if (description == null || description == "") {
            var descEl = doc.select("#comicsContent").first();
            if (descEl != null) {
                description = descEl.text().trim();
            } else {
                description = "";
            }
        }

        return Response.success({
            name: name,
            cover: cover,
            author: author,
            description: description,
            host: BASE_URL,
            genres: genres,
            comment: {
                input: doc.select('li[class^=comment_]'),  
                script: "comment.js"
            }
        });
    }
    return null;
}