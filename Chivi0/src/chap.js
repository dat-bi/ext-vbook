function execute(url) {
    let total_parts = url.split("?parts=")[1];
    if(total_parts<1) total_parts = 1;
    url = url.split("?parts=")[0];
    let cvdata = [];
    for(let i = 0; i < total_parts; i++){
        let response_parts = fetch(url+"/"+i);
        console.log(url+"/"+i)
        if (response_parts.ok) {
            let data_i = response_parts.json()
            let cvzh_i = data_i.zhtext;
            let cvdata_i = data_i.cvdata;
            if(checkParts(cvdata_i,total_parts)===true){
                cvzh_i.shift();
            }
            Array.prototype.push.apply(cvdata, cvzh_i);
        }
    }
    if(cvdata){
        let htm = cvdata.join("<br>");
        return Response.success(htm);
    }
    return null;
}

function checkParts(content, total_parts) {
    let heading = content.split("\n")[0];
    if(heading.includes("/"+total_parts+"]")){
        return true
    }
    return false;
}
