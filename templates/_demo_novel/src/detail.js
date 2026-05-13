// detail.js — Thông tin chi tiết một truyện
// Contract: execute(url) → { name*, cover, host, author, description, ongoing:bool*,
//                             genres?:[{title,input,script}], suggests?:[{title,input,script}],
//                             comments?:[{title,input,script}] }
function execute(url) {
    // TODO: Normalize URL
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);

    var res = fetch(url);
    if (!res.ok) return Response.error("Cannot load: " + res.status);

    var doc = res.html();

    // TODO: Selector tên truyện (thường là h1)
    var nameEl = doc.select("SELECTOR_TITLE").first();
    var name = (nameEl ? nameEl.text() : "") + "";

    // TODO: Selector ảnh bìa — selector thẻ img, thử data-src trước (lazy-load)
    var coverEl = doc.select("SELECTOR_COVER_IMG").first();
    var cover = "";
    if (coverEl) {
        cover = (coverEl.attr("data-src") || coverEl.attr("src") || "") + "";
        if (cover.startsWith("//")) cover = "https:" + cover;
        if (cover && !cover.startsWith("http")) cover = BASE_URL + cover;
        // ✅ Chỉ encode phần path + query (nếu cần)
        try {
            var urlObj = new URL(cover);
            // encode pathname (tránh lỗi space, unicode…)
            urlObj.pathname = urlObj.pathname
                .split("/")
                .map(p => encodeURIComponent(p))
                .join("/");
            cover = urlObj.toString();
        } catch (e) {
            // fallback nếu URL lỗi format
            cover = encodeURI(cover);
        }
    }

    // TODO: Selector tác giả — selector link hoặc text tác giả
    var authorEl = doc.select("SELECTOR_AUTHOR").first();
    var author = (authorEl ? authorEl.text() : "") + "";

    // TODO: Selector trạng thái — "Đang ra" / "Hoàn thành" / "Ongoing" / "Completed"
    var statusEl = doc.select("SELECTOR_STATUS").first();
    var status = (statusEl ? statusEl.text() : "") + "";
    var ongoing = status.indexOf("Hoàn") === -1
        && status.indexOf("Completed") === -1
        && status.indexOf("Full") === -1
        && status.indexOf("完结") === -1;

    // TODO: Selector mô tả — selector container chứa tóm tắt, lấy html() để giữ định dạng
    var descEl = doc.select("SELECTOR_DESCRIPTION").first();
    var description = (descEl ? descEl.html() : "") + "";

    // TODO: Selector thể loại — selector các thẻ <a> link thể loại
    var genres = [];
    doc.select("SELECTOR_GENRE_LINKS").forEach(function (el) {
        var gTitle = el.text() + "";
        var gHref = (el.attr("href") || "") + "";
        if (!gTitle || !gHref) return;
        if (!gHref.startsWith("http")) gHref = BASE_URL + gHref;
        genres.push({ title: gTitle, input: gHref, script: "gen.js" });
    });

    // TODO: Gợi ý — truyện liên quan hoặc cùng tác giả (tùy chọn)
    var suggests = [];
    // Cách đơn giản: tìm theo tác giả nếu có search.js
    suggests.push({ title: "Liên quan: ", input: author, script: "suggests.js" });

    // TODO: Bình luận — chỉ thêm nếu site có comment (Q9=Có)
    let comments = [];
    let inputcomment = ""; // có thể là lấy ngay từ SELECTOR nào đó trên trang, hoặc API riêng nếu có
    comments.push({ title: "Bình luận", input: inputcomment, script: "comment.js" });

    return Response.success({
        name: name,
        cover: cover,
        host: BASE_URL,
        author: author,
        description: description,
        ongoing: ongoing,
        format: "series",
        genres: genres.length > 0 ? genres : undefined,
        suggests: suggests.length > 0 ? suggests : undefined,
        comments: comments
    });
}
