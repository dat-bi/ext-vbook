function getDetailHtml5(url) {
    const bookidRegex = /bookid=(\d+)/;
    const match = url.match(bookidRegex);
    const bookid = match[1];
    let url2 = "https://bookshelf.html5.qq.com/qbread/api/novel/adbooks/bookinfo?bookid=" + bookid
    let response = fetch(url2, { "headers": { "Referer": "https://bookshelf.html5.qq.com/qbread/adread/catalog" } });
    let doc = response.json();
    let book = doc.data.bookInfo
    let data = {
        name: book.resourceName,
        cover: book.picurl,
        author: book.author,
        description: book.summary.replace(/\n/g, "<br>"),
        detail: "作者： " + book.author + "<br>" + book.subject,
        ongoing: !book.isfinish,
        host: "https://bookshelf.html5.qq.com"
    }
    return data
}
function getTocHtml5(url) {
    const bookidRegex = /bookid=(\d+)/;
    const match = url.match(bookidRegex);
    const resourceid = match[1];
    let url_catalog = "https://novel.html5.qq.com/cgi-bin/novel_reader/catalog?book_id=" + resourceid
    let response = fetch(url_catalog, { "headers": { "Referer": "https://bookshelf.html5.qq.com/qbread/adread/catalog" } })
    let doc = response.json();
    let el = doc.catalog
    const data = [];
    for (let i = 0; i < el.length; i++) {
        let link = "https://bookshelf.html5.qq.com/qbread/api/wenxue/buy/ad-chapter/v3?resourceid=" + resourceid + "&serialid=" + el[i].serial_id + "&apn=1&readnum=1&duration=2&srcCh="
        data.push({
            name: el[i].serial_name,
            url: link,
            host: "https://bookshelf.html5.qq.com"
        })
    }
    return data
}
function getChapHtml5(url) {
    const [resourceId, serialId] = url.match(/resourceid=(\d+).*serialid=(\d+)/).slice(1);
    let response = fetch('https://novel.html5.qq.com/be-api/content/ads-read', {
        method: 'POST',
        headers: {
            'Referer': 'https://novel.html5.qq.com/',
            'Q-GUID': '0ee63838b72eb075f63e93ae0bc288cb',
            'QIMEI36': '8ff310843a87a71101958f5610001e316a11',
        },
        body: JSON.stringify({
            'ContentAnchorBatch': [
                {
                    'BookID': resourceId,
                    'ChapterSeqNo': [serialId]
                }
            ],
            'Scene': 'chapter'
        })
    });
    let doc = response.json();
    let content = doc.data.Content[0].Content[0]
    // if(!doc.data.isFree) return Response.success("Không FREE");
    // let content = doc.data.content.join("<br>")
    content = content.replace(/\r\n/g, "<br><br>").replace(/<br\s*\/?>|\n/g, "<br><br>")

    return content;
}