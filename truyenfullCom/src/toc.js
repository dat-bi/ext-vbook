function execute(url) {
    var response = fetch(url);
    if(response.ok){
        let chapters = [];
        response.json().items.forEach(function (item, index){
            chapters.push({
                name: item.chapter_name,
                url: url + "/chuong-" +index+ ".html"//item.chapterID
            });
        })
        return Response.success(chapters);
    }
    return null
}