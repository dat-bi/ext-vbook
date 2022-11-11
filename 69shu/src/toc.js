load('libs.js');

function execute(url) {
    url = url.replace(/.+\.69shu\.com\/txt\/(\d+)\.htm/, 'https://www.69shu.com/$1').append('/');

    let response = fetch(url);
    if (response.ok) {
        let doc = response.html('gbk');

		var data = [];
		var elems = $.QA(doc, 'div.catalog > ul > li > a:not(#bookcase)');
		
		elems.forEach(function(e) {
			data.push({
				name: formatName(e.text()),
				url: e.attr('href'),
				host: 'https://www.69shu.com'
			})
		});

		return Response.success(data);
    }
    return null;
}


// "63.第63章 无上极境，诸神共鸣" --> "第63章 无上极境，诸神共鸣"
function formatName(name) {
    var re = /^(\d+)\.第(\d+)章/;

    return name.replace(re, '第$2章');
}