// detail.js — Thông tin chi tiết một truyện
// Contract: execute(url) → { name*, cover, host, author, description, ongoing:bool*,
//                             genres?:[{title,input,script}], suggests?:[{title,input,script}],
//                             comments?:[{title,input,script}] }
load('config.js');

function execute(url) {
    // Normalize URL
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    
    var browser = Engine.newBrowser(); // Khởi tạo browser
    var doc = browser.launch(url, 5000);
    browser.close();

    // Selector tên truyện
    var nameEl = doc.select(".info-box .title").first();
    var name = (nameEl ? nameEl.text().trim() : "") + "";

    // Selector ảnh bìa
    var coverEl = doc.select(".image-box img").first();
    var cover = "";
    if (coverEl) {
        cover = (coverEl.attr("data-src") || coverEl.attr("src") || coverEl.attr("srcset") || "") + "";
        
        // Nếu là srcset, lấy link đầu tiên
        if (cover.indexOf(",") !== -1) {
            cover = cover.split(",")[0].trim().split(" ")[0];
        } else if (cover.indexOf(" ") !== -1) {
            cover = cover.split(" ")[0];
        }

        // Xử lý proxy Nuxt (_ipx)
        if (cover.indexOf("http") !== -1 && cover.indexOf("/http") !== -1) {
            cover = "http" + cover.split("/http").pop();
        }
        
        if (cover.startsWith("//")) cover = "https:" + cover;
        if (cover && !cover.startsWith("http") && !cover.startsWith("data:")) cover = BASE_URL + cover;
    }

    // Selector tác giả
    var authorEl = doc.select(".author").first();
    var author = (authorEl ? authorEl.text().replace(/Tác giả:\s*/, "").trim() : "") + "";

    // Selector trạng thái
    var statusEl = doc.select(".tag.status-tag").first();
    var status = (statusEl ? statusEl.text().trim() : "") + "";
    var ongoing = status.indexOf("Hoàn") === -1
        && status.indexOf("Completed") === -1
        && status.indexOf("Full") === -1
        && status.indexOf("完结") === -1;

    // Selector mô tả
    var descEl = doc.select(".description-content").first();
    var description = (descEl ? descEl.html() : "") + "";

    // Selector thể loại
    var genres = [];
    doc.select(".tag.genre-tag").forEach(function (el) {
        var gTitle = el.text().trim() + "";
        if (!gTitle) return;
        genres.push({ title: gTitle, input: BASE_URL + "/the-loai/" + encodeURIComponent(gTitle), script: "gen.js" });
    });

    // Gợi ý — truyện liên quan hoặc cùng tác giả (tùy chọn)
    var suggests = [];
    if (author) {
        suggests.push({ title: "Truyện cùng tác giả: " + author, input: BASE_URL + "/search?q=" + encodeURIComponent(author), script: "gen.js" });
    }

    return Response.success({
        name: name,
        cover: cover,
        host: BASE_URL,
        author: author,
        description: description,
        ongoing: ongoing,
        format: "series",
        genres: genres.length > 0 ? genres : undefined,
        suggests: suggests.length > 0 ? suggests : undefined
    });
}
