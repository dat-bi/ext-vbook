function execute(url) {
    var doc = Http.get(url+ "/").html()
    var check_content = String(doc.select(".reading")).indexOf("<br>")!=-1
    console.log(check_content)
    var images = doc.select(".img-center")
    if(check_content==false){
        var listImage = [] 
        images.forEach(image => listImage.push(image.attr("data-echo")))
        return Response.success(listImage)
    }
    else{
        var content = doc.select(".reading").html()
        content = content.replace(/<strong> <\/strong>/,'').replace(/---.+Xin Hãy Đọc.+/,'').replace(/<img.+\"><br>/,'').replace(/(<br>\s*){2,}/gm, '<br>')

        return Response.success(content)
    }
}