function execute(url) {
    var doc = Http.get(url).html();
    if (doc) {
        doc.select("noscript").remove();
        doc.select("script").remove();
        doc.select("iframe").remove();
        doc.select("ins").remove();
        doc.select("a").remove();
        var txt = doc.select("#content .ads-content > article")
        txt.select("div").remove();
        txt= txt.html().replace(/ⓚ|к/g, "k").replace("ⓒ", "c").replace(/kyhuyen.com/gi, "").replace(/kyhuyencom/gi, "");
        console.log(txt)
        return Response.success(txt);
    }
    return null;
}
