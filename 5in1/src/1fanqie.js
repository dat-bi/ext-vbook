function getTocFanqienovel(url) {
    let host = "http://localhost:9999";
    let id_fanqie = url.match(/\d+/g)[1];
    let response = fetch(host + "/catalog?book_id=" + id_fanqie)
    let json = response.json();
    let chapter_list = json.data.data.item_data_list;
    const data = [];
    chapter_list.forEach((e) => {
        data.push({
            name: e.title,
            url: host + "/content?item_id=" + e.item_id,
            host: host
        })
    });
    return data
}
function getChapFanqie(url) {
    let response_chapter_info = fetch(url)
    if (response_chapter_info.ok) {
        let json = response_chapter_info.json();
        let chapter_info = json.data.data.content.replace(/<br\s*\/?>|\n/g, "<br><br>");
        return chapter_info;
    }
    return "Kiểm tra lại app Fanqie";

}