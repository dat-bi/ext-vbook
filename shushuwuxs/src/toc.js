function execute(url) {
    if(url.includes("new_")){
        url  = url.replace('new_','read_').replace('.html','/')
    }
    url = url.replace('m.shushuwuxs','www.shushuwuxs')
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let el1 = doc.select("#list").last()
        let el = el1.select("dl > dd")
        const data = [];
        for (let i = 12;i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select("a").text(),
                url: "https://www.shushuwuxs.com" + e.select("a").attr("href"),
                host: "https://www.shushuwuxs.com"
            })
        }
        return Response.success(data);
    }
    return null;
}