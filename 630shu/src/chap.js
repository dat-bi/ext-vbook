load('libs.js');

function execute(url) {
    // https://m.630shu.net/book_110896/62615650.html --> https://www.630shu.net/shu/110896/62615650.html
    url = url.replace(/m\.630shu\.net\/(chapters|book)_(\d+)\/(\d+)\.html$/gm, 'www.630shu.net/shu/$2/$3.html');

    var response = fetch(url);
    if (response.ok) {
        var doc = response.html('gbk');
		
		var htm = $.Q(doc, '#content').html();

		htm = htm.replace(/\&nbsp;/g, '')
			.replace(/恋上你看书网.*?最快更新.*?最新章节！/, '');

		return Response.success(htm);
    }
    return null;
}