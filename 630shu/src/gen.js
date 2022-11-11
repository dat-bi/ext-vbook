load('libs.js');

function execute(url, page) {
    var host = 'https://www.630shu.net';
    if (!page) page = '1';
    url = String.format('{0}/{1}/{2}.html', host, url, page);

    var response = fetch(url);
    if (response.ok) {
        var doc = response.html('gbk');

		var data = [];

		var elems = $.QA(doc, '#tlist > ul > li');
		if (!elems.length) return Response.error(url);
		
		elems.forEach(function(e) {
			var link = $.Q(e, 'div.zp > a').attr('href');
			
			data.push({
				name: $.Q(e, 'div.zp > a').text(),
				link: link,
				cover: genCover(link),
				description: $.Q(e, 'div.zz > a').text(),
				host: host
			})
		})

		var next = parseInt($.Q(doc, '#pagestats').text().match(/(\d+)\//)[1]) + 1;
		
		return Response.success(data, next.toString());
    }
    return null;
}

function genCover(bookUrl) {
    var host = 'https://www.630shu.net', m, id;

    if ((m = bookUrl.match(/(\d+)\.html$/)) && m[1] && (id = m[1])) {
        // https://www.630shu.net/files/article/image/184/184279/184279s.jpg
        return String.format('{0}/files/article/image/{1}/{2}/{3}s.jpg', host, Math.floor(id / 1000), id, id);
    }

    return 'https://www.630shu.net/modules/article/images/nocover.jpg';
}