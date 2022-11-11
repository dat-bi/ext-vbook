load('libs.js');

function execute(url) {
    var host = 'https://www.630shu.net';
    // https://m.630shu.net/book_43404 --> https://www.630shu.net/shu/43404.html
    url = url.replace(/m\.630shu\.net\/(chapters|book)_(\d+)\/?$/gm, 'www.630shu.net/shu/$2.html');
    var doc = Http.get(url).html('gbk');
	
    var response = fetch(url);
    if (response.ok) {
        var doc = response.html('gbk');

		var coverImg = $.Q(doc, '#picbox > div.img_in > img').attr('src').mayBeFillHost(host);
		var author = $.Q(doc, '#info > div.options > span:nth-child(1) > a').text().trim();
		var lastUpdated = $.Q(doc, '#info > div.update').text();

		return Response.success({
			name: $.Q(doc, '#info > h1').text(),
			cover: coverImg,
			author: author,
			description: $.Q(doc, '#intro').text(),
			detail: String.format('作者: {0}<br>{1}', author, lastUpdated),
			host: host
		});
    }
    return null;
}