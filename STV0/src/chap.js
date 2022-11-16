load('crypto.js')
load('aes.js')
function execute(url) {
    var doc = fetch(url+"/").text()
    var htmlContent = doc.match(/var htmlContent="(.+)";<\/script> <\/div><\/div><section class=container>/)[1].replace(/\\\\\\/g,'').replace(/\\\\/g,'').replace(/\\\"/g,'"')
    
    var chapterHTML = CryptoJSAesDecrypt('qX3xRL' + 'guhD2Z' + '9f7sWJ', htmlContent)
    var listImage = []
    var images = Html.parse(chapterHTML).select('img')

    images.forEach(image=>{
        if(image.attr("src").indexOf('data:image')==-1)
            listImage.push(image.attr("src"))
        else
            listImage.push(image.attr("data-qx3xrl").replace(/qX3xRL/g,'.').replace(/guhD2Z/g,':').replace(/9f7sWJ/g, '/'))
        
    })
    return Response.success(listImage)

}
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