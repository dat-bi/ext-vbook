function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let el = doc.select("#list li")
        const data = [];
        for (let i = 0;i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select("a").text(),
                url: "https://www.xsyz.cc" + e.select("a").attr("href"),
                host: "https://www.xsyz.cc"
            })
        }
        return Response.success(data);
    }
    return null;
}