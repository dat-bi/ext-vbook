function execute(url) {
    let bookid = url.split(/[/ ]+/).pop()
    let newurl = "https://api3-normal-lf.fqnovel.com/reading/bookapi/directory/all_items/v/?book_id=" + bookid + "&need_version=true&&iid=2665637677906061&aid=1967&app_name=novelapp&version_code=495"
    let response = fetch(newurl, {
        headers: {
            'user-agent': UserAgent.android()
        }
    });
    if (response.ok) {
        let res_json = response.json();
        let item_data_list = res_json.data.item_data_list;
        let data = [];
        for (let i = 0; i < item_data_list.length; i++) {
            let item = item_data_list[i];
            let link = "https://fanqienovel.com/reader/" + item.item_id;
            data.push({
                name: item.title,
                url: link ,
                host: "https://fanqienovel.com"
            })
        }
        return Response.success(data);  
    }
    return null;
}