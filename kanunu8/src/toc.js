function execute(url) {
    var url = url.replace('index.html','')
    let icb = url.split("/")[3];
    let icb1 = url.split("/")[4];
    let response = fetch(url);
    if (response.ok) {
    let doc = response.html('gbk');
        if(true){
            var el = doc.select("body > div:nth-child(1) > table:nth-child(10) > tbody > tr:nth-child(4) > td > table:nth-child(2) > tbody td a");
            if(el.toString().length === 0 ){
                var el = doc.select("body > div.main > div.col-left > div > dl dd a")
                if(el.toString().length === 0 ){
                    var el = doc.select("body > div.main > div.col-left > div > table:nth-child(4) > tbody tr td a");
                        if(el.toString().length === 0 ){
                            var el = doc.select("body > div:nth-child(1) > table:nth-child(10) > tbody > tr > td:nth-child(2) > table:nth-child(4) > tbody > tr > td > table:nth-child(2) > tbody tr td a");
                    }
                }
            }
        }
        var href1 = el.attr("href")
        let href1Length = href1.split("/").length
        if(href1Length > 4 ){
           var aaa = url.split("/");
            aaa.splice(3,6)
            var url = aaa.join('/');
        }else if (href1Length >1){           
            var aaa = url.split("/");
            aaa.pop();
            var url = aaa.join('/') + '/';
        }else{
            if(url.slice(-1) !== "/"){
            url = url + "/"}
        }
        const data = [];
        var sizeEl = el.size()
        for (let i = 0;i < sizeEl; i++) {
            var e = el.get(i);
            data.push({
                name: e.select("a").text(),
                url: url + e.attr("href"),
                host: "https://www.kanunu8.com/"
            })
        }
        return Response.success(data);
    }
    return null;
}

        // if(icb === 'files'){
        //     // console.log(el)
        //     if(icb1 === 'dushi'){            
        //     var aaa = url.split("/");
        //     aaa.pop();
        //     var url = aaa.join('/') + '/';
        //     }else{
        //    var aaa = url.split("/");
        //     aaa.splice(3,6)
        //     var url = aaa.join('/');
        //     }

        // }
// function execute(url) {
//     var url = url.replace('index.html','')
//     let icb = url.split("/")[3];
//     let icb1 = url.split("/")[4];
//     let response = fetch(url);
//     if (response.ok) {
//     let doc = response.html('gbk');
//         if(icb === 'book3'||icb === 'book4'|| icb === 'book'){
//             var el = doc.select("body > div:nth-child(1) > table:nth-child(10) > tbody > tr:nth-child(4) > td > table:nth-child(2) > tbody td a");
//         }
//         if(icb ==='book2'){
//             var el = doc.select("body > div.main > div.col-left > div > dl dd a")
//             var mmm = el.toString().length;
//             if(mmm === 0 ){
//                 var el = doc.select("body > div.main > div.col-left > div > table:nth-child(4) > tbody tr td a");
//             }  
//         }
//         if(url.slice(-1) !== "/")
//         url = url + "/";
//         if(icb === 'files'){
//             var el = doc.select("body > div:nth-child(1) > table:nth-child(10) > tbody > tr > td:nth-child(2) > table:nth-child(4) > tbody > tr > td > table:nth-child(2) > tbody tr td a");
//             // console.log(el)
//             if(icb1 === 'dushi'){            
//             var aaa = url.split("/");
//             aaa.pop();
//             var url = aaa.join('/') + '/';
//             }else{
//            var aaa = url.split("/");
//             aaa.splice(3,6)
//             var url = aaa.join('/');
//             }

//         }
//         const data = [];
//         // let sizeEl = el.size()
//         for (let i = 0;i < el.size(); i++) {
//             var e = el.get(i);
//             data.push({
//                 name: e.select("a").text(),
//                 url: url + e.attr("href"),
//                 host: "https://www.kanunu8.com/"
//             })
//         }
//         return Response.success(data);
//     }
//     return null;
// }