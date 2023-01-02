function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html('gbk');
        if(true){
            var name0  = doc.select("body > div:nth-child(1) > table:nth-child(10) > tbody > tr > td:nth-child(2) > table:nth-child(1) > tbody > tr > td > h2 > b").text().trim();
            if(name0.toString().length === 0 ){
                var name0  = doc.select("body > div:nth-child(1) > table:nth-child(10) > tbody > tr:nth-child(1) > td > h1").text().trim();
                if(name0.toString().length === 0 ){
                    var name0  = doc.select("body > div.main > div.col-left > div > h1").text().trim();
                }
            }
            var description = doc.select("body > div:nth-child(1) > table:nth-child(10) > tbody > tr > td:nth-child(2) > table:nth-child(4) > tbody > tr > td > p").text();
            if(description.toString().length === 0 ){
                var description = doc.select("body > div:nth-child(1) > table:nth-child(10) > tbody > tr > td:nth-child(2) > table:nth-child(4) > tbody > tr > td > table:nth-child(1) > tbody > tr ").text();
                if(description.toString().length === 0 ){
                    var description = doc.select("body > div:nth-child(1) > table:nth-child(10) > tbody > tr:nth-child(4) > td > table:nth-child(1) > tbody > tr:nth-child(2) > td").text();
                    if(description.toString().length === 0 ){
                        var description = doc.select("body > div.main > div.col-left > div > div.description > p").text()||doc.select("body > div.main > div.col-left > div > table:nth-child(3) > tbody > tr:nth-child(2) > td").text();
                    }
                }
            }
            var author = doc.select("body > div:nth-child(1) > table:nth-child(10) > tbody > tr:nth-child(2) > td").text();
            if(author.toString().length === 0 ){
                var author = doc.select("body > div.main > div.col-left > div > h2 > a").text();
                if(author.toString().length === 0 ){
                    var author = 'null';
                }
            }
        }
        return Response.success({
            name: name0,
            cover:'https://raw.githubusercontent.com/dat-bi/ext-vbook/main/anh-bia/0.png',
            author: author,
            description: description,
            detail: "作者： " + author,
            host: "https://www.kanunu8.com/"
        });
    }
    return null;
}
// function execute(url) {
//     let response = fetch(url);
//     if (response.ok) {
//         let doc = response.html('gbk');
//         let icb = url.split("/")[3];
//         let icb1 = url.split("/")[4];
//         if(icb === 'files'&icb1 === 'youth'){
//             var name0  = doc.select("body > div:nth-child(1) > table:nth-child(10) > tbody > tr > td:nth-child(2) > table:nth-child(1) > tbody > tr > td > h2 > b").text().trim();
//             var name = name0;
//             var author = 'null';
//             var description = doc.select("body > div:nth-child(1) > table:nth-child(10) > tbody > tr > td:nth-child(2) > table:nth-child(4) > tbody > tr > td > p").text();
//         }
//         else if(icb === 'files'){
//             var name0  = doc.select("body > div:nth-child(1) > table:nth-child(10) > tbody > tr > td:nth-child(2) > table:nth-child(1) > tbody > tr > td > h2 > b").text().trim();
//             var name = name0;
//             var author = 'null';
//             var description = doc.select("body > div:nth-child(1) > table:nth-child(10) > tbody > tr > td:nth-child(2) > table:nth-child(4) > tbody > tr > td > table:nth-child(1) > tbody > tr ").text();
//         }
//         else if (icb === 'book4'||'book3'||'book'){
//             var name0  = doc.select("body > div:nth-child(1) > table:nth-child(10) > tbody > tr:nth-child(1) > td > h1").text().trim();
//             var name = name0;
//             var author = doc.select("body > div:nth-child(1) > table:nth-child(10) > tbody > tr:nth-child(2) > td").text();
//             var description = doc.select("body > div:nth-child(1) > table:nth-child(10) > tbody > tr:nth-child(4) > td > table:nth-child(1) > tbody > tr:nth-child(2) > td").text();
//         } 
//         if(icb === 'book2'){
//             var name0  = doc.select("body > div.main > div.col-left > div > h1").text().trim();
//             var name = name0;
//             var author = doc.select("body > div.main > div.col-left > div > h2 > a").text();
//             var description = doc.select("body > div.main > div.col-left > div > div.description > p").text()||doc.select("body > div.main > div.col-left > div > table:nth-child(3) > tbody > tr:nth-child(2) > td").text();
//         }
        
//         return Response.success({
//             name: name,
//             cover:'https://www.kanunu8.com/files/terrorist/201102/1633/img.jpg',
//             author: author,
//             description: description,
//             detail: "作者： " + author,
//             host: "https://www.kanunu8.com/"
//         });
//     }
//     return null;
// }
        // let icb = url.split("/")[3];
        // let icb1 = url.split("/")[4];