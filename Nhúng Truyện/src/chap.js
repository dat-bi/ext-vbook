function execute(url) {
    let id = url.split("/")[4]
    let newUrl = "https://cp.nhungtruyen.com/api/chapters/"+id
    console.log(newUrl)
    var response = fetch(newUrl)
    if(response.ok){
        let json = response.json()
        let text = json._data.vi
        var content = ""
        for(let i = 1; i < text.length - 1; i++){
            content = content + text[i] + "<br><br>"
        }
            return Response.success(content);
    }
    return null

}