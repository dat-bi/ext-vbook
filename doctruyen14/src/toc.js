load('config.js');
function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL)
    if (url.slice(-1) !== "/") url = url + "/";
    console.log(url)
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let data = [];

        data.push({
            name: "Phần 1",
            url: url,
            host: BASE_URL
        })

        let last = doc.select('.last').first().attr("href")
        if(last ){
            last = last.match(/\/\d+\//g)[0].match(/\d+/g)[0]
        } else {
            last = doc.select('.larger').last().text();
        }
        for(let i = 2; i <= parseInt(last); i++){
            data.push({
                name: "Phần " + i,
                url: url + "/" + i + "/",
                host: BASE_URL
            })
        
        }

        return Response.success(data);
    }
    return null;
}