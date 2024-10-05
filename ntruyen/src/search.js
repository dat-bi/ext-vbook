function execute(key, page) {
    var key = encodeURIComponent(key)
    let response = fetch("https://ntruyen.top/tim-kiem/" + key)
    if (response) {
        let doc = response.html();
        let data = [];
        let elems = doc.select("#top-voted .small-story_item")
        // console.log(elems)
        if (!elems.length) return Response.error(key);

        elems.forEach(function (e) {
            var link = e.select('a').first().attr('href')
            data.push({
                name: e.select('a').first().attr('title'),
                link: link,
                cover: e.select('img').attr('src'),
                description:  e.select('.story-title').text()
            })
        })
        return Response.success(data);
    }
    return null;
}
