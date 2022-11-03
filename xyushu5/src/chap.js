function execute(url) {
        // https://www.xyushu5.com/read/46324/20215015/
        // var bookId = url.replace('https://m.xyushu5.com/novel/','').replace('.html','')
        let response = fetch(url);
        if (response.ok) {
            let doc = response.html();
            // let htm = doc.select("#main > div:nth-child(3) > div:nth-child(1) > p").html();
            let htm = doc.select("#nr1").html();
            htm = htm.replace(/&(nbsp|amp|quot|lt|gt|bp|emsp);/g, "")
            console.log(htm)
            return Response.success(htm);
        }
    return null;
}