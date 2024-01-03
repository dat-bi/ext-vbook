let config_host = "https://fanqienovel.com"
function getTocFanqienovel(url) {
    let newurl = `https://novel.snssdk.com/api/novel/book/directory/detail/v1/?aid=1967&item_ids=${url}`
    console.log(newurl)
    
	let response = fetch(newurl, {
        headers: {
            'user-agent': UserAgent.android()
        }
    });
    if (response.ok) {
        let res_json = response.json();
        let item = res_json.data;
        const book = [];
        for (let i = 0; i < item.length; i ++) {
            book.push({
                name: item[i].title,           
                url: config_host + "/reader/" + item[i].item_id,
                host: config_host
            })
        }
        return book;  
    }
    return null;
}
function getChapFanqie(url) {
    const regex = /(?:item_id=|\/)(\d+)$/;
    let chapid = url.match(regex)[1]

    let newurl = "https://novel.snssdk.com/api/novel/book/reader/full/v1/?aid=2329&item_id=" + chapid
    let response = fetch(newurl, {
        headers: {
            'user-agent': UserAgent.android()
        }
    });
    if (response.ok) {
        let res_json = response.json();
        let dataa = res_json.data.content;  
        var doc = Html.parse(dataa);
        var content = doc.select('article').html();
        return content;
    }
    return null;
}

// function getTocFanqienovel(url) {
//     let host = "http://localhost:9999";
//     let id_fanqie = url.match(/\d+/g)[1];
//     let response = fetch(host + "/catalog?book_id=" + id_fanqie)
//     let json = response.json();
//     let chapter_list = json.data.data.item_data_list;
//     const data = [];
//     chapter_list.forEach((e) => {
//         data.push({
//             name: e.title,
//             url: host + "/content?item_id=" + e.item_id,
//             host: host
//         })
//     });
//     return data
// }
// function getChapFanqie(url) {
//     let response_chapter_info = fetch(url)
//     if (response_chapter_info.ok) {
//         let json = response_chapter_info.json();
//         let chapter_info = json.data.data.content.replace(/<br\s*\/?>|\n/g, "<br><br>");
//         return chapter_info;
//     }
//     return "Kiểm tra lại app Fanqie";

// }