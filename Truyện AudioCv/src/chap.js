load('config.js');
function execute(url) {
    var data = ""
    var doc = fetch(url,{
        method: "GET",
            headers: {
                // 'user-agent': UserAgent.android(),
                'content-type': 'text/html; charset=UTF-8'
            }
        })
    if(!doc.ok){ return Response.error("Ấn vào trang nguồn để check verify")}
    else {
        let page = url.split("listen?i=")[1]
        console.log(page % 3)
        if(page%3 === 0 ){
            var track1 = doc.text().match(/\[\{\"track\":0,(.*?)\"track\":2(.*?)\"isFree\":1\}/g)[0] + "]"
        }else{
            var track1 = doc.text().match(/\[\{\"track\":0,(.*)\"isFree\":1\}/g)[0] + "]"
        }
        var track = JSON.parse(track1)
        var trackLength =track.length
        for(var i =0; i < trackLength ; i++){
            let newUrl = BASE_URL +"/api/getText?taskId="+ track[i].id
            let json = fetch(newUrl).json();
            var content = json.content
            data += content
        }
        data = data.replace(/Nguồn Truyện Audio CV chấm com./g,"").replace(/<br \/>/g,"\n").replace(/\\n\./g,"").replace(/<br> Cách Chương\.<br>/g,"");
        return Response.success(data); 
    }
}

                