function execute(key, page) {
    var key = encodeURIComponent(key)
    let response = fetch("https://tienhiep.xyz/story/search?query=" + key)
    if (response) {
        let json = response.json();
        // console.log(typeof json)
        let data = [];
        let elems = json.stories
        elems.forEach(function (e) {
            data.push({
                name: e.name,
                link: "https://tienhiep.xyz/" + e.slug,
                cover: e.thumbnail,
                description:  e.status
            })
        })
        return Response.success(data);
    }
    return null;
}
