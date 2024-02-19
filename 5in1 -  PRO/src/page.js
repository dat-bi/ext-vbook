function execute(url) {
    let urlB = url
    let allBook = []
    console.log(urlB.length)
    if (url.includes("fanqienovel")) {
        url = "https://sangtacviet.vip/truyen/fanqie/1/" + url.match(/\d+/g)[0]
    }
    if (url.includes("fanqie")) {
        let book_id = url.match(/\d+/g)[1]
        let newurl = "https://novel.snssdk.com/api/novel/book/directory/list/v1/?device_platform=android&version_code=600&novel_version=&app_name=news_article&version_name=6.0.0&app_version=6.0.0aid=520&channel=1&device_type=landseer&os_api=25&os_version=10&book_id=" + book_id
        let response = fetch(newurl, {
            headers: {
                'user-agent': UserAgent.android()
            }
        });
        if (response.ok) {
            let res_json = response.json();

            let array = res_json.data.item_list;
            // 2048 characters
            let chunkSize = 80
            for (let i = 0; i < array.length; i += chunkSize) {
                let chunk = array.slice(i, i + chunkSize).join(",");
                console.log(chunk)
                allBook.push(chunk);
            }
            return Response.success(allBook);
        }
    } else {
        allBook.push(urlB)
        return Response.success(allBook)
    }
}