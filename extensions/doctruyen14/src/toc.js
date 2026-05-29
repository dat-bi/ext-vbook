load('config.js');
function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL)
    if (url.slice(-1) !== "/") url = url + "/";
    var baseUrl = url.slice(0, -1);
    console.log(url)
    var response = fetch(url);
    if (response.ok) {
        var doc = response.html();
        var data = [];

        data.push({
            name: "Phần 1",
            url: url,
            host: BASE_URL
        })

        var last = 1;
        var links = doc.select(".wp-pagenavi a[href]");
        for (var i = 0; i < links.size(); i++) {
            var item = links.get(i);
            var href = item.attr("href") + "";
            var text = item.text() + "";
            var number = 0;
            var match = href.match(/\/(\d+)\/?$/);
            if (match && match[1]) number = parseInt(match[1]);
            if (!number && text.match(/^\d+$/)) number = parseInt(text);
            if (number > last) last = number;
        }
        for(var i = 2; i <= last; i++){
            data.push({
                name: "Phần " + i,
                url: baseUrl + "/" + i + "/",
                host: BASE_URL
            })
        
        }

        return Response.success(data);
    }
    return null;
}
