function execute(url) {
    if(url.indexOf("modules/obook/reader") !== -1){
        var response = fetch(url);
        if (response.ok) {
            let text = response.text('gbk') // Trả về response request dạng string
            var i1 = text.replace(/<i class=\"webfont\">/g,"").replace(/<\/i>/g,"").replace(/\n|\s/g,"").replace(/&(nbsp|amp|quot|lt|gt|bp|emsp);/g, "").replace(/<!doctypehtml>(.*?)<divclass="acontent"id="ccontent">/g,"").replace(/<spanstyle=.*?>/g,"").replace(/<\/span>/g,"").replace(/<\/div>.*?<\/html>/g,"").replace(/<br\/>/g,"\n")
            if(i1.length <= 500){
                var html1 = "Đây là chương VIP. Nếu muốn đọc bạn cần mua chương VIP rồi đăng nhập tài khoản vào trình duyệt của Vbook.<br>Nếu đã mua rồi mà vẫn không đọc được thì lập chủ đề báo lỗi nha!";
                return Response.success(html1);
            }
        return Response.success(replaceFont(i1));
        }
    }
    else  // chương thường
    {
        let response2 = fetch(url);
        if (response2.ok) {
            let doc2 = response2.html('gbk');
            let htm2 = doc2.select(".acontent").html();
            htm2 = htm2.replace(/&(nbsp|amp|quot|lt|gt|bp|emsp);/g, "")
            return Response.success(htm2);
        }
        return null;
    }
}
function replaceFont(e){
    var arr = [/&#xe800;/g,"“",/&#xe801;/g,"”",/&#xe802;/g,"。",/&#xe803;/g,"一",/&#xe804;/g,"下",/&#xe805;/g,"不",/&#xe806;/g,"之",/&#xe807;/g,"也",/&#xe808;/g,"了",/&#xe809;/g,"人",/&#xe80a;/g,"他",/&#xe80b;/g,"以",/&#xe80c;/g,"但",/&#xe80d;/g,"位",/&#xe80e;/g,"低",/&#xe80f;/g,"你",/&#xe810;/g,"候",/&#xe811;/g,"做",/&#xe812;/g,"再",/&#xe813;/g,"又",/&#xe814;/g,"叫",/&#xe815;/g,"可",/&#xe816;/g,"呢",/&#xe817;/g,"和",/&#xe818;/g,"啊",/&#xe819;/g,"喊",/&#xe81a;/g,"嗯",/&#xe81b;/g,"回",/&#xe81c;/g,"因",/&#xe81d;/g,"在",/&#xe81e;/g,"地",/&#xe81f;/g,"大",/&#xe820;/g,"天",/&#xe821;/g,"她",/&#xe822;/g,"好",/&#xe823;/g,"如",/&#xe824;/g,"它",/&#xe825;/g,"完",/&#xe826;/g,"就",/&#xe827;/g,"已",/&#xe828;/g,"很",/&#xe829;/g,"得",/&#xe82a;/g,"心",/&#xe82b;/g,"想",/&#xe82c;/g,"我",/&#xe82d;/g,"所",/&#xe82e;/g,"把",/&#xe82f;/g,"是",/&#xe830;/g,"有",/&#xe831;/g,"没",/&#xe832;/g,"然",/&#xe833;/g,"的",/&#xe834;/g,"看",/&#xe835;/g,"知",/&#xe836;/g,"笑",/&#xe837;/g,"答",/&#xe838;/g,"而",/&#xe839;/g,"能",/&#xe83a;/g,"要",/&#xe83b;/g,"路",/&#xe83c;/g,"身",/&#xe83d;/g,"那",/&#xe83e;/g,"都",/&#xe83f;/g,"，"]
    let arrLength = arr.length
    for( var i = 0 , j = 1 ; i < arrLength ; i += 2 , j += 2 ){
        var e = e.replace(arr[i],arr[j])
    }
    return e;
}