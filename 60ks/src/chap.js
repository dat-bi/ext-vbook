// http://m.60ks.net/101515/2267/15151805.html -----http://www.60ks.net/ks/139/139060/43155455.html
function execute(url) {
    url = url.replace('m.60ks.cc','www.60ks.cc/ks').replace('index.html','')
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html('gbk');
        console.log(doc)
        let content = doc.select("#content").html();
        // console.log(content)
        content = content
            //.replace(/<a[^>]*>([^<]+)<\/a>/g,'')
            .replace(/sript/g,'')
            .replace(/\n/g,'')
            .replace(/&(nbsp|amp|quot|lt|gt);/g, "")
            .replace(/(<br\s*\/?>){2,}/g, '<br>'); 
        return Response.success(content);
    }
    return null;
}