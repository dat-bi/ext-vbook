load('config.js');
function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    console.log(url)
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();

        // Tên truyện
        var name = "";
        var h1 = doc.select(".box_info_right h1").first();
        if (h1 != null) {
            name = h1.text().trim();
        }

        // Ảnh bìa
        var cover = "";
        var img = doc.select(".box_info_left .img img").first();
        if (img != null) {
            cover = img.attr("src");
            if (cover != null && cover !== "" && cover.indexOf("http") !== 0) {
                // href kiểu /images/... thì nối BASE_URL
                cover = BASE_URL + cover;
            }
        }

        // Nhóm dịch -> author
        var author = "";
        // p.info-item có text "Nhóm dịch"
        var teamEl = doc.select(".box_info_right .info-item:contains(Nhóm dịch) a").first();
        if (teamEl != null) {
            author = teamEl.text().trim();
        }

        // Thể loại
        var genres = [];
        var genreEls = doc.select(".box_info_right ul.list-tag-story li a");
        for (var i = 0; i < genreEls.size(); i++) {
            var e = genreEls.get(i);
            var gTitle = e.text().trim();
            var gHref = e.attr("href");

            // Nếu muốn bỏ domain, giữ path:
            gHref = gHref.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, '');

            genres.push({
                title: gTitle,
                input: gHref,
                script: "gen.js"
            });
        }

        // Mô tả: ưu tiên .story-detail-info, fallback meta description
        var description = "";
        var descEl = doc.select(".story-detail-info").first();
        if (descEl != null) {
            description = descEl.text().trim();
        }
        if (description === "") {
            description = doc.select("meta[name=description]").attr("content");
            if (description == null) description = "";
        }

        // Comment: lấy block <ul class="comments"> cho comment.js xử lý selector li[class^=comment_]
        var cmtUl = doc.select(".list_comment .li_comment");


        return Response.success({
            name: name,
            cover: cover,
            author: author,
            description: description,
            host: BASE_URL,
            genres: genres,
            comment: {
                input: cmtUl,
                script: "comment.js"
            }
        });
    }
    return null;

}