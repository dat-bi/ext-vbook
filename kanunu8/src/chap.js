function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html('gbk');
        if (true){
            var htm = doc.select("body > div:nth-child(1) > table:nth-child(10) > tbody > tr > td:nth-child(2) > p").html();
            htm = htm.replace(/&nbsp;/g,'')
            if(htm.length === 0 ){
                var htm = doc.select("#Article > div").html().replace(/&nbsp;/g,'');
                htm = Html.clean(htm, ["p"]).replace(/&nbsp;/g,'').replace(/上一页　 回目录　 下一页/g,'')
                if(htm.length === 0 ){
                    var htm = doc.select("#content p").html();
                    if(htm.length === 0 ){
                        var htm = doc.select("body > div > table:nth-child(5) > tbody > tr > td:nth-child(2) > p").html();
                        htm = htm.replace(/&nbsp;/g,'')
                    }
                }
            }
        }    
        return Response.success(htm);
    }
    return null;
}
// function execute(url) {
//     let response = fetch(url);
//     if (response.ok) {
//         let doc = response.html('gbk');
//         let icb = url.split("/")[3];
//         let icb1 = url.split("/")[4];
//         if (icb === 'book2'){
//             var htm = doc.select("body > div:nth-child(1) > table:nth-child(10) > tbody > tr > td:nth-child(2) > p").html();
//             htm = htm.replace(/&nbsp;/g,'')
            
//             var mmm = htm.length;
//             if(mmm === 0 ){
//                 var htm = doc.select("#Article > div").html().replace(/&nbsp;/g,'');
//                 htm = Html.clean(htm, ["p"]).replace(/&nbsp;/g,'').replace(/上一页　 回目录　 下一页/g,'')
//             }
//         }
//         if (icb === 'files'& icb !== 'dushi'){
//             var htm = doc.select("#content p").html();
//         }
//         if(true){
//             var htm = doc.select("body > div > table:nth-child(5) > tbody > tr > td:nth-child(2) > p").html();
//             htm = htm.replace(/&nbsp;/g,'')
//         }
    
//         return Response.success(htm);
//     }
//     return null;
// }