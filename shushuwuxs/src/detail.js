function execute(url) {
    if(url.includes("new_")){
        url  = url.replace('new_','read_').replace('.html','/')
    }
    url = url.replace('m.shushuwuxs','www.shushuwuxs')
    let response = fetch(url);
    if (response.ok) {

        let doc = response.html();
        let coverImg = doc.select("#fmimg > img").first().attr("src");
        let author = doc.select("#info > p:nth-child(2)").first().text();
        return Response.success({
            name: doc.select("#info > h1").text(),
            cover: coverImg,
            author: author,
            description: doc.select("#intro").text(),
            detail: null,
            host: "http://www.shushuwuxs.com"
        });
    }
    return null;
}