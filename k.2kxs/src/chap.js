function execute(url) {
    let doc = Http.get(url).html();
    content = doc.select('.row .content-ext').html()
    let url1 = url.split(".html")[0]+"_2"+".html"
    let doc1 = Http.get(url1).html();
    content1 = doc1.select('.row .content-ext').html()
    let url2 = url.split(".html")[0]+"_3"+".html"
    let doc2 = Http.get(url2).html();
    content2 = doc2.select('.row .content-ext').html()
    let content3 = content + content1 + content2
    content3 = content3.replace(/&nbsp;/g,'')
                        .replace(/第(.*?)章(.*?)\(第\d\/\d页\)/g,'')
                        .replace('（本章未完，请点击下一页继续阅读）','');
    return Response.success(content3);
}
