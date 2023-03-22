function execute(url) {
url = url.replace('www.123duw.com','m.123duw.com')
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
            url: "https://www.123duw.com" + e.select("a").attr("href") + '///' + e.select("a").text(),
            host: "https://www.123duw.com"
        });
        }
        return Response.success(data);
    }
    return null;
}