function execute(url) {
    url = url.replace('www.','m.')
        if(url.slice(-1) !== "/")
        url = url + "/";
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let author =  doc.select('meta[property="og:novel:author"]').attr("content");
        let coverImg = doc.select('meta[property="og:image"]').attr("content");
        let descriptionMeta = doc.select('meta[property="og:description"]').attr("content");
        let novelTitle = doc.select('meta[property="og:title"]').attr("content");
        let status = doc.select('meta[property="og:novel:status"]').attr("content");
        let updateTime = doc.select('meta[property="og:novel:update_time"]').attr("content");
        let category = doc.select('meta[property="og:novel:category"]').attr("content");
        return Response.success({
            name: novelTitle,
            cover: coverImg,
            author: author,
            description: ("<br>Thể loại: <br>") + category + ("<br>⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀<br>") + "Trạng thái: " + status + ("<br>⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀<br>") + descriptionMeta,
            detail: "Tác giả：" + author + ("<br>⠀⠀⠀⠀<br>") + "Mới nhất: "+ updateTime,
            host: "https://m.123duw.com"
        });
    }
    return null;
}