function execute(url) {
    sleep(1000)
    let doc = fetch(url,{
        method: "GET",
            headers: {
                // 'user-agent': UserAgent.android(),
                'content-type': 'text/html; charset=UTF-8'
            }
        }).text()
    if(doc.ok){ return Response.success("Ấn vào trang nguồn để check verify")}
    else {
        sleep(1000)
        let id = doc.match(/\[\{\"track\":0,.*?\"name\"/g)[0].match(/\d+/g)[1]
        let response = fetch("https://truyenaudiocvv.com/api/getText?taskId="+ id);
        if (response.ok) {
            let json = response.json();
            var content = json.content
            content = content.replace("Nguồn Truyện Audio CV chấm com.","")
                            .replace(/<br \/>/g,"\n")
                            .replace(/\\n\./g,"")
                            .replace(/<br> Cách Chương\.<br>/g,"")
            return Response.success(content);              
        } else {
            return Response.error("Ấn vào trang nguồn để check verify")
        }        
    }
}

                