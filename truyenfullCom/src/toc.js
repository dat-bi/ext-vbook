function execute(url) {
    let url1 = fetch(url).html().select("#list-chapter ul > li:nth-child(1) a").first().attr("href").replace(/chuong.*?html/g, "").replace(/arc-.*?html/g, "").replace("https://truyenfull.com", "https://truyenfull1.com")
    var truyenId = url.replace(/\.com\/.*?\./g, "").match(/\d+/g)[0];
    let response = fetch("https://truyenfull.com/api/chapters/" + truyenId)
    if (response.ok) {
        const jsonData = response.json();
        const itemSize = jsonData.items.length;
        let chapters = [];
        for (let i = 1; i <= itemSize; i++) {
            chapters.push({
                name: "Chương " + i,
                url: url1 + "chuong-" + i + ".html",
            });
        }
        return Response.success(chapters);
    }
    return null
}