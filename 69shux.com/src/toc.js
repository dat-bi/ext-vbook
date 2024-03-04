load('libs.js');
load('config.js');

function execute(url) {
    const regex = /\/(\d+)\.html/;
    const match = url.match(regex);
    let book_id = match[1];
    console.log(book_id)
    let response = fetch(BASE_URL + "/book/" + book_id +"/index.html");
    if (response.ok) {
        let doc = response.html();

		var data = [];
		var elems = $.QA(doc, 'div.catalog > ul > li > a:not(#bookcase)');
		
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