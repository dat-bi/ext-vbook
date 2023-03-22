function execute(url, page) {
	url = url.replace('m.123duw.com', 'www.123duw.com');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        const data = [];
		doc.select(".DivMargin .DivBottomLine").forEach(e => {
            data.push({
                name: e.select(".DivNewTitle a.Green").first().text(),
                link: e.select(".DivNewTitle a.Green").first().attr("href"),
                //body > div.DivMain > div.DivMainRightBig > div.DivMainLeftMiddle > div:nth-child(3) > div.DivMargin > div:nth-child(31) > div.DivNewTitle > a:nth-child(2)
                description: e.select(".DivNewTitle a").last().text(),
                host: "http://www.123duw.com"
            })
        });

		if (data.length === 0) {
			doc.select(".hot div.item").forEach(e => {
                var coverImg = e.select(".image img").first().attr("src");
                console.log(coverImg)
                data.push({
                    name: e.select("a").last().text(),
                    cover: coverImg,
                    link: e.select(".image a").first().attr("href"),
                    description: e.select("dd").first().text(),
                    host: "http://www.123duw.com"
                })
			    
            }
            ); 
		}

        return Response.success(data)
    }
    return null;
}


// function execute(url, page) {
// 	url = url.replace('m.123duw.com', 'www.123duw.com');
//     let response = fetch(url);
//     if (response.ok) {
//         let doc = response.html();
//         const data = [];
// 		doc.select(".DivMargin div").forEach(e => {
//             data.push({
//                 name: e.select(".DivNewTitle a.green").first().text(),
//                 link: e.select(".DivNewTitle a.green").first().attr("href"),
//                 //body > div.DivMain > div.DivMainRightBig > div.DivMainLeftMiddle > div:nth-child(3) > div.DivMargin > div:nth-child(31) > div.DivNewTitle > a:nth-child(2)
//                 description: e.select(".DivNewTitle a").last().text(),
//                 host: "http://www.123duw.com"
//             })
//         });

// 		if (data.length === 0) {
// 			doc.select(".hot div.item").forEach(e => {
//                 var coverImg = e.select(".image img").first().attr("src");
//                 console.log(coverImg)
//                 data.push({
//                     name: e.select("a").last().text(),
//                     cover: coverImg,
//                     link: e.select(".image a").first().attr("href"),
//                     description: e.select("dd").first().text(),
//                     host: "http://www.123duw.com"
//                 })
			    
//             }
//             ); 
// 		}

//         return Response.success(data)
//     }
//     return null;
// }