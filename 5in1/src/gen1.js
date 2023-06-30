function execute(url, page) {
load('libs.js');
    if (!page) page = '1';
    let response = fetch(STVHOST + url + '&p=' + page)
    if (response.ok) {
        let doc = response.html()
        let next = doc.select(".pagination").select("li.active + li").text()
        let el = doc.select("#searchviewdiv a.booksearch")
        let data = [];
        function toCapitalize(sentence) {
            const words = sentence.split(" ");

            return words.map((word) => {
                return word[0].toUpperCase() + word.substring(1);
            }).join(" ");
        }
        el.forEach(e => {
            let img = e.select("img").first().attr("src");
            let iff = e.select(".info span:nth-child(3)").first().text();
            let iffx = e.select(".info span:nth-child(1)").first().text();
            let dat1 = iffx >2000;
            let dat2 = iff < 250;
            let dat3 = iff > 60;
            if (img.startsWith('//')) img = img.replace('//', 'https://')
            
            	if( dat1 ) {
            	if( dat2 ) {
            	if( dat3 ) {
            data.push({
            	
                name: toCapitalize(e.select(".searchbooktitle").first().text()),
                link: e.select("a").first().attr("href"),
                cover: img,
                description: e.select(".info span").first().text(),
                host: STVHOST
                
            })
            }}}
        });
        return Response.success(data, next)
    }
    return null;
}