function execute(url) {
    var doc = Http.get(url).html();
    if (!doc) return null;
    console.log(url);
    // Lấy phần nội dung chương
    var html = doc.select(".novel-reading-content").html();

    // Gom toàn bộ CSS trong <style> để phân tích
    var cssText = "";
    var styles = doc.select("style");
    for (var i = 0; i < styles.size(); i++) {
        cssText += styles.get(i).html();
    }

    // Tạo từ điển class → ký tự
    var dict = {};
    var regex = /span.([a-zA-Z0-9-]+):before\s{\scontent:\s"(.?)"\s;?\s}/g;
    var match;
    while ((match = regex.exec(cssText)) !== null) {
        dict[match[1]] = match[2];
    }
//HELLO
    // Thay thế <span class="xxx"></span> bằng chữ tương ứng
    html = html.replace(/\<span class="([^"]+)"\>\<\/span\>/g, function(match, cls) {
        return dict[cls] || '';
    });

    // Dọn dẹp HTML
    html = html
        .replace(/ƣ/g, 'ư')
        .replace(/<a[^>]>.?<\/a>/gi, '') // Xoá liên kết
        .replace(/<\/?(div|span)[^>]>/gi, '') // Xoá thẻ dư
        .replace(/<p>\s<p>/gi, '<p>')
        .replace(/<\/p>\s<\/p>/gi, '</p>')
        .replace(/(<br>\s){2,}/gi, '<br>') // Giảm số <br>
        .replace(/^(<br>\s)+|(<br>\s)+$/gi, '') // Xoá <br> đầu/cuối
        .replace(/&(nbsp|amp|quot|lt|gt);/gi, '') // Xoá HTML entity
        .replace(/\s+/g, ' ') // Giảm khoảng trắng
        .replace(/>\s+</g, '><')
        .trim();

    return Response.success(html);
}