function getTocUukanshu(id) {
    url = "https://sj.uukanshu.net/book.aspx?id=" + id;
    var doc = Http.get(url).html();
    var el = doc.select("#chapterList a")
    var data = [];
    for (var i = 0; i < el.size(); i++) {
        var e = el.get(i);
        data.push({
            name: e.select("a").text(),
            url: e.attr("href"),
            host: "https://sj.uukanshu.net"
        })
    }
    var page = doc.select(".pages a").last().attr("href").match(/page=(\d+)/);
    if (page) {
        page = parseInt(page[1]);
        if (page > 1) {
            for (var p = 2; p <= page; p++) {
                doc = Http.get(url + "&page=" + p).html();
                var el = doc.select("#chapterList a")
                for (var i = 0; i < el.size(); i++) {
                    var e = el.get(i);
                    data.push({
                        name: e.select("a").text(),
                        url: e.attr("href"),
                        host: "https://sj.uukanshu.net"
                    })
                }
            }
        }
    }
    return data;
}
function getChapUukanshu(url) {
    var htm = "";
    if (url.indexOf("sj.uukanshu.net") !== -1) {
        var doc = Http.get(url).html();
        doc.select(".ad_content").remove();
        doc.select("div.box").remove();
        htm = doc.select("#bookContent").html();
    } else {
        var doc = Http.get(url).html("gb2312");
        doc.select(".ad_content").remove();
        htm = doc.select("#contentbox").html();
    }
    htm = htm.replace(/[UＵ][UＵ]\s*看书\s*[wｗ][wｗ][wｗ][\.．][uｕ][uｕ][kｋ][aａ][nｎ][sｓ][hｈ][uｕ][\.．][cｃ][oｏ][mｍ]/gi, "");
    htm = htm.replace(/\&nbsp;/g, "").replace(/<br\s*\/?>|\n/g, "<br><br>");
    return htm;
}