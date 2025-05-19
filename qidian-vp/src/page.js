function execute(url) {
    let response = fetch(url + "/muc-luc?page=1");
    let doc = response.html();
    let pagination = doc.select('li.ant-pagination-item ').last().text();
    let page = []
    for (let i = 1; i <= pagination; i++) {
       page.push(url + "/muc-luc?page=" + i )
    }
    return Response.success(page);
}

