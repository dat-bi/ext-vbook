
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
        let authorInfo = res_json.data.book_info.original_authors;
        let detailinfo = res_json.data.book_info.sub_info;
        let author = JSON.parse(authorInfo)[0].AuthorName;
        let bookname = res_json.data.book_info.book_name;
        // let bookid = res_json.data.book_info.book_id;
        let description = res_json.data.book_info.abstract.replace(/\n/g, "<br>");
        let coverImg = res_json.data.book_info.thumb_url;
        // coverImg = "http://p3-novel.byteimg.com/origin/" + coverImg + ".png";
        return Response.success({
            name: bookname,
            cover: coverImg,
            author: author ,
            description: description,
            detail: "作者： " + author  + "||" + detailinfo,
            host: "https://fanqienovel.com",
        });
    }
    return null;
}