load('libs.js');
load('config.js');

function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL).replace("index.html","");
    let url_toc = url.replace("m.","www.")+ "index.html"

    let response = fetch(url_toc);
    if (response.ok) {
        let doc = response.html();

		var data = [];
		var elems = $.QA(doc, '#list > dl:nth-child(2) dd a');
		
		elems.forEach(function(e) {
			data.push({
				name: e.text(),
				url: e.attr('href'),
				host: BASE_URL
			})
		});

		return Response.success(data);
    }
    return null;
}


// // "63.第63章 无上极境，诸神共鸣" --> "第63章 无上极境，诸神共鸣"
// function formatName(name) {
//     var re = /^(\d+)\.第(\d+)章/;

//     return name.replace(re, '第$2章');
// }