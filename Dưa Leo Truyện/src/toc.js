load('config.js');
function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let list = [];

        var items = doc.select(".list-chapters .item");
        for (var i = 0; i < items.size(); i++) {
            var item = items.get(i);

            var a = item.select(".episode-title a").first();
            if (a == null) {
                continue;
            }

            var name = a.text().trim();
            var url = a.attr("href");

            if (url != null && url != "" && url.indexOf("http") != 0) {
                url = BASE_URL + url;
            }

            list.push({
                name: name,
                url: url,
                host: BASE_URL
            });
        }

        list.reverse();
        return Response.success(list);
    }
    return null;
}