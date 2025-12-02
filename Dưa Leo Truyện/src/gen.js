load('config.js');
function execute(url, page) {
    if (!page) { page = 1; }
    let response = fetch(BASE_URL + url + "?page=" + page);
    console.log(BASE_URL + url + "?page=" + page);
    console.log(response.status);
    if (response.ok) {
        let doc = response.html();
        var next = doc.select(".page_redirect .active + a").text();
        var data = [];

        var items = doc.select(".li_truyen");

        for (var i = 0; i < items.size(); i++) {
            var e = items.get(i);

            // Link truyện
            var link = "";
            var a = e.select("a").first();
            if (a != null) {
                link = a.attr("href");
                if (link != null && link.indexOf("http") != 0) {
                    link = BASE_URL + link;
                }
            }

            // Tên truyện
            var name = "";
            var h6 = e.select(".name").first();
            if (h6 != null) {
                name = h6.text();
            }

            // Ảnh bìa
            var cover = "";
            var img = e.select("img").first();
            if (img != null) {
                cover = img.attr("data-src");
                if (cover == null || cover == "") {
                    cover = img.attr("src");
                }
            }
// ---- Chapter mới nhất ----
    var chapter_name = e.select(".chap_name").first().text();

    // ---- Thời gian cập nhật ----
    var update_time = "";
    var postOn = e.select(".time").first();
    if (postOn != null) {
        update_time = postOn.text().trim();
    }

    // ---- Description (gộp tên chap + thời gian) ----
    var description = chapter_name;
    if (update_time != "") {
        description = description + " · " + update_time;
    }
            data.push({
                name: name,
                link: link,
                cover: cover,
                description: description,
                host: BASE_URL
            });
        }
        return Response.success(data, next);
    }
    return null;
}