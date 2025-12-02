load('config.js');
load('base64.js');
function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    let response = fetch(url);
if (response.ok) {
    var doc = response.html();
    var data = [];

    // Set kiểm tra ảnh đã thêm chưa
    var used = {};

    var imgs = doc.select(".content_view_chap img");

    for (var i = 0; i < imgs.size(); i++) {
        var e = imgs.get(i);

        var img = "";

        // 1. data-src (nếu có)
        img = e.attr("data-src");

        // 2. data-lazy (base64) -> decode
        if (img == null || img === "") {
            var lazy = e.attr("data-lazy");
            if (lazy != null && lazy !== "") {
                try {
                    img = Base64.decode(lazy);
                } catch (err) {
                    img = "";
                }
            }
        }

        // 3. data-lazy-original (base64) -> decode
        if (img == null || img === "") {
            var lazyOrg = e.attr("data-lazy-original");
            if (lazyOrg != null && lazyOrg !== "") {
                try {
                    img = Base64.decode(lazyOrg);
                } catch (err2) {
                    img = "";
                }
            }
        }

        // 4. data-original (url thường)
        if (img == null || img === "") {
            img = e.attr("data-original");
        }

        // 5. src (url thường)
        if (img == null || img === "") {
            img = e.attr("src");
        }

        // Bỏ ảnh bìa/placeholder nếu cần (theo ID)
        if (img && img.indexOf("10031288211667576604.webp") > -1) {
            continue;
        }

        // Bỏ ảnh null/rỗng
        if (img == null || img === "") continue;

        // Bỏ ảnh trùng
        if (used[img]) continue;
        used[img] = true;

        data.push(img);
    }

    return Response.success(data);
}
return null;

}