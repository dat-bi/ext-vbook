function execute(url) {
url = url.replace('www.123ds.org','m.123ds.org')
        if(url.slice(-1) !== "/")
        url = url + "/";
    let response = fetch(url + 'list/');
    if (response.ok) {
        let doc = response.html();
        const data = [];
        doc= doc.select(".MuLuUL li")
        for (let i = 0;i < doc.size(); i++) {
            let e = doc.get(i);
        data.push({
            name: e.select("a").text(),
            url: "https://m.123ds.org" + e.select("a").attr("href"),
            host: "https://m.123ds.org"
        });
        }
        return Response.success(data);
    }
    return null;
}