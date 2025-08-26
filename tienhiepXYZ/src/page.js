function execute(url) {
    if (url.slice(-1) !== "/") url = url + "/";
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let list = [];
        let truyenId = doc.select(".info > div:nth-child(3) > span:nth-child(3)").text();
        let page = Math.ceil(truyenId.match(/\d+/g)[0] / 50); 
        console.log(page);
        for (let i = 1; i <= page; i++) {
            list.push(url + "trang-" + i + "/");
        }
        return Response.success(list);
    }

    return null;
}