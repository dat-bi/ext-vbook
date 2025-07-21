load('config.js');
function execute(url, page) {
    if(!page) page = '1';
    url = BASE_URL.replace("m.","www.") +url + "_"+page+"/"
    console.log('url: ' + url);
    
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html('gbk');
        const data = [];
        let next = doc.select("a:contains(>>)").first().attr("href").slice(0, -1).split(/[/ ]+/).pop();
        
		doc.select("#articlelist > ul:nth-child(3) li ").forEach(e => {
            

            data.push({
                name: e.select(".l02 a").first().text(),
                link: BASE_URL + '/novel/' + e.select(".l02 a").last().attr("href").match(/\d+/g)[1] + '.html' ,
                cover: "https://i.postimg.cc/T2WtdmBM/5BdXa90.webp",
                description: e.select(".l01").text() + e.select(".l07").text(),
                host: BASE_URL 
            })
        });


        return Response.success(data,next)
    }
    return null;
}