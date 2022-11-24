function execute(key, page) { 
    var key = encodeURIComponent(key)
    var url = "https://www.google.com/search?q="+key+"+site%3Ahttps%3A%2F%2Fntruyen.vn%2F"
    let response = fetch(url)
    if (response) {
        let doc = response.html();
        let data = [];
        let elems = doc.select("a[href*='url?q=https:']")
        console.log(elems)
        if (!elems.length) return Response.error(key);

        elems.forEach(function(elems) {
            var link = elems.select('a').attr('href').match(/https:\/\/ntruyen.vn\/(.*?).html/g)+""
            data.push({
                name: elems.select('h3').text(),
                link: link
            })
        })
        return Response.success(data);
    }
    return null;
}
