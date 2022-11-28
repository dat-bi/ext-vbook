load("base64.js");
function execute(url) {
    var doc = Http.get(url+ "/").html()
    var check_content = String(doc.select(".reading")).indexOf("<br>")!=-1
    console.log(check_content)
    var id = doc.select("#data").attr("data-id")
    var redirect = doc.select("#data").attr("data-redirect")
    if(check_content===false){
        var doc = Http.post("https://truyenkkz.com/wp-admin/admin-ajax.php")
        .params({
            "action" : "user_buy_chap",
            "post_id" : id,
            "redirect": redirect,
        }).html()
        var genre = ""
            var el = doc.select("div[id^='kkcode']");
            for (var i = 0; i < el.size(); i++) {
                var e = el.get(i);
                var text = e.text()
                genre = genre + Base64.decode(text)
            }

        return Response.success(locRac(genre))
    }
    else{
        var content = doc.select(".reading").html()
        content = content.replace(/<strong> <\/strong>/,'').replace(/---.+Xin Hãy Đọc.+/,'').replace(/<img.+\"><br>/,'').replace(/(<br>\s*){2,}/gm, '<br>')

        return Response.success(content)
    }

}
function locRac(text){
    text = text.replace(/{font-size: 1px}/g,"")
    var st =text.match(/<style>(.*?)<\/style>/g)
    for(var i=0; i < st.length ; i++){
        let rac = st[i].replace(/(<style>|<\/style>)/g,"")
        var text = text.replace(new RegExp("<" + rac + ">(.*?)</" + rac + ">","gm"), "")
    }
    return text.replace(/<style>(.*?)<\/style>/g,"")
}