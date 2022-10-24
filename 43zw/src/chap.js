//xu ly neu chia nhieu chuong neu khong co link
// function getText(url, part){
//     let response = fetch( url+ "_" + part + ".html")
//     if (response.ok) {
//         let doc = response.html('gbk');
//         let htm = doc.select(".word_in").html().replace(/\&nbsp;/g, "").replace(/<br>/g,"");
//         var html = htm.length

//         let array = [htm,html]
//         return array;
//     } 
// }
// function execute(url) {
//     url = url.replace(".html","")
//     let part = 0;
//     var hkt = "";
//     while(getText(url, part)[1] > 100){
//         part++
//         hkt = hkt + getText(url, part)[0];
//         console.log(hkt)
//     }
//     return Response.success(hkt)

// }
//xu ly neu chia nhieu chuong co dinh

function execute(url) {
    url = url.replace('.html','')
    let response = fetch( url+ "_1.html")
    if (response.ok) {
        let doc1 = response.html('gbk');
        var htm1 = doc1.select(".word_in").html().replace(/\&nbsp;/g, "").replace(/<br>/g,"");
        let response1 = fetch( url+ "_2.html")
        if (response1.ok) {
            let doc2 = response1.html('gbk');
            let htm2 = doc2.select(".word_in").html().replace(/\&nbsp;/g, "").replace(/<br>/g,"");
            var htm = htm1 + htm2; 
            return Response.success(htm);
        }
    }
    return null;
}