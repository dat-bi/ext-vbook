load('libs.js');

function execute(url) {
    var id = url.replace(/https.*?\/1\//g,"").replace("/","")
    console.log(id)
    if(url.includes("qidian")){
        return null;
    }
    else if(url.includes("uukanshu")){
        return Response.success(getTocUU(id))
    } else if(url.includes("69shu")){
        return Response.success(getTo69shu(id))
    }
    return null
}
function getTocUU(id){
    url = "https://sj.uukanshu.com/book.aspx?id=" + id;
    var doc = Http.get(url).html();
    var el = doc.select("#chapterList a")
    var data = [];
    for (var i = 0; i < el.size(); i++) {
        var e = el.get(i);
            data.push({
                name: e.select("a").text(),
                url: e.attr("href"),
                host: "https://sj.uukanshu.com"
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
                            host: "https://sj.uukanshu.com"
                        })
                    }
                }
            }
        }
    return data;
}
function getTo69shu(id){
    let response = fetch('https://www.69shu.com/' + id +'/');
    if (response.ok) {
        let doc = response.html('gbk');

		var data = [];
		var elems = doc.select('div.catalog > ul > li > a:not(#bookcase)');
		elems.forEach(function(e) {
			data.push({
				name: formatName(e.text()),
				url: e.attr('href'),
				host: 'https://www.69shu.com'
			})
		});

		return data;
    }
}
function formatName(name) {
    var re = /^(\d+)\.第(\d+)章/;

    return name.replace(re, '第$2章');
}
