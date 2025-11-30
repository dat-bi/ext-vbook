load('config.js');
function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    let response = fetch(url);
    if (response.ok) {
        var doc = response.html();
        var data = [];

        // Set kiểm tra ảnh đã thêm chưa
        var used = {};

        var imgs = doc.select(".page-break img");

        for (var i = 0; i < imgs.size(); i++) {
            var e = imgs.get(i);

            var img = e.attr("data-src");
            if (img == null || img == "") {
                img = e.attr("src");
            }

            // Bỏ ảnh cần xoá
            if (img.indexOf("/images/10031288211667576604.webp") > -1) continue;

            // Bỏ ảnh null/rỗng
            if (img == null || img == "") continue;

            // Bỏ ảnh trùng
            if (used[img]) continue;
            used[img] = true;

            data.push(img);
        }

        return Response.success(data);
    }
    return null;
}