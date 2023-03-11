function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        const data = [];
        doc= doc.select(".excerpts-wrapper .excerpts a")
        for (let i = 0;i < doc.size(); i++) {
            let e = doc.get(i);
        data.push({
            name: e.text(),
            url: e.attr("href"),
            host: "www.zhenhunxiaoshuo.com"
        });
        }
        return Response.success(data);
    }
    return null;
}