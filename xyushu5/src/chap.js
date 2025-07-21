function execute(url) {
        let response = fetch(url);
        if (response.ok) {
            let doc = response.html();
            let htm = doc.select("#nr1").html();
            htm = htm.replace(/&(nbsp|amp|quot|lt|gt|bp|emsp);/g, "")
            console.log(htm)
            return Response.success(htm);
        }
    return null;
}