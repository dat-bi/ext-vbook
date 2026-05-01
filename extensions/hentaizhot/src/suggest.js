load("config.js");

function execute(url) {
    var res = fetch(url, { headers: { "User-Agent": UserAgent.chrome() } });
    if (!res.ok) return Response.error("Lỗi: " + res.status);
    
    var root = JSON.parse(res.text() + "");
    if (!root.result) return Response.error("Không tìm thấy kết quả");
    
    var data = [];
    try { eval("data = " + root.result + ";"); } catch(e) {}
    var indices = data[1]; 
    if (!indices || !Array.isArray(indices)) return Response.success([]);

    function resolve(idx) { return (typeof idx === 'number') ? data[idx] : idx; }

    var items = [];
    for (var i = 0; i < indices.length; i++) {
        var item = resolve(indices[i]);
        if (item && item.slug) {
            var name = resolve(item.title);
            var slug = resolve(item.slug);
            var cover = "";
            var poster = resolve(item.posterImage);
            if (poster && poster.filePath) {
                cover = IMAGE_URL + resolve(poster.filePath);
            }
            items.push({
                name: name || slug,
                link: encodeURI(BASE_URL + "/watch/" + slug),
                cover: cover,
                host: BASE_URL
            });
        }
    }
    
    return Response.success(items);
}
