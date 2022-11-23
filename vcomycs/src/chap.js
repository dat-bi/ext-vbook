load('crypto.js');

function execute(url) {
    //var doc = Http.get(url).string()
    var doc = fetch(url).text()

    //--------------------

    var htmlContent = doc.match(/htmlContent="(.+)".+text-center post-credit">/)[1].replace(/\\\\/g,'').replace(/\\\"/g,'"')
    var chapterHTML=CryptoJSAesDecrypt('EhwuFp'+'SJkhMV'+'uUPzrw',htmlContent)
    chapterHTML = chapterHTML.replace(/EhwuFp/g, '.');
    chapterHTML = chapterHTML.replace(/SJkhMV/g, ':');
    chapterHTML = chapterHTML.replace(/uUPzrw/g, '/');
    var images = Html.parse(chapterHTML).select("img")
    Console.log(images.size())
    var listImage = []
    // for(var i in images){
    //     var img =images[i].attr("data-ehwufp")
    //     listImage.push(img)
    // }
    images.forEach(image=>{
        listImage.push(image.attr("data-ehwufp"))
    })
    return Response.success(listImage)
}
//https://vcomycs.net/het-nhu-han-quang-gap-nang-gat-chap-214/

function CryptoJSAesDecrypt(passphrase, encrypted_json_string) {
        var obj_json = JSON.parse(encrypted_json_string);
        var encrypted = obj_json.ciphertext;
        var salt = CryptoJS.enc.Hex.parse(obj_json.salt);
        var iv = CryptoJS.enc.Hex.parse(obj_json.iv);
        var key = CryptoJS.PBKDF2(passphrase, salt, {
            hasher: CryptoJS.algo.SHA512,
            keySize: 64 / 8,
            iterations: 999
        });
        var decrypted = CryptoJS.AES.decrypt(encrypted, key, {
            iv: iv
        });
        return decrypted.toString(CryptoJS.enc.Utf8);
}