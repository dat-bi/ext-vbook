load('libs.js');
function execute(input) {
    let response = fetch(STVHOST + '/?find=&findinname=' + input );
        function toCapitalize(sentence) {
        const words = sentence.split(" ");
        return words.map((word) => {
            return word[0].toUpperCase() + word.substring(1);
        }).join(" ");
    }

    if (response.ok) {
        let doc = response.html()
        let el = doc.select("#searchviewdiv a.booksearch")
        let data = [];
        el.forEach(e => {
            data.push({
                name: toCapitalize(e.select(".searchbooktitle").first().text()),
                link: e.select("a").first().attr("href"),
                cover: e.select("img").first().attr("src"),
                description: e.select(".info span:nth-child(3)").text() + " Chương - " + e.select(".searchtag").first().text(),
                host: STVHOST
            })
        });
        return Response.success(data)
    }
    return null;
}