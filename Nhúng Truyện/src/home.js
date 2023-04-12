function execute() {
    return Response.success([
        {
            "input": "https://nhungtruyen.com/xep-hang/qidian-vote",
            "title": "Đề Cử Khởi Điểm",
            "script": "gen.js"
        },
        {
            "input": "https://nhungtruyen.com/xep-hang/qidian-read",
            "title": "Lượt Đọc Khởi Điểm",
            "script": "gen.js"
        },
        {
            "input": "https://nhungtruyen.com/xep-hang/qidian-fan",
            "title": "Hâm Mộ Khởi Điểm",
            "script": "gen.js"
        },
        {
            "input": "https://nhungtruyen.com/xep-hang/qidian-recommend",
            "title": "Giới Thiệu Khởi Điểm",
            "script": "gen.js"
        },
        {
            "input": "https://nhungtruyen.com/xep-hang/qdmm-vote",
            "title": "Đề Cử Nữ Sinh",
            "script": "gen.js"
        },
        {
            "input": "https://nhungtruyen.com/xep-hang/qdmm-read",
            "title": "Lượt Đọc Nữ Sinh",
            "script": "gen.js"
        },
        {
            "input": "https://nhungtruyen.com/xep-hang/qdmm-fan",
            "title": "Hâm Mộ Nữ Sinh",
            "script": "gen.js"
        },
        {
            "input": "https://nhungtruyen.com/xep-hang/qdmm-recommend",
            "title": "Giới Thiệu Nữ Sinh",
            "script": "gen.js"
        },
        {
            "input": "https://nhungtruyen.com/xep-hang/zongheng-vote",
            "title": "Đề Cử Tung Hoành",
            "script": "gen.js"
        },
        {
            "input": "https://nhungtruyen.com/xep-hang/zongheng-read",
            "title": "Lượt Đọc Tung Hoành",
            "script": "gen.js"
        }
    ])
}
    // let re = fetch(url).html();
    // let el = re.select(".py-5.px-5.bg-auto.rounded-md.text-sm > ul > li > ul li a")
    // let data = [];
    // el.forEach(e => data.push({
    //     input: e.attr("href"),
    //     title: e.text().replace("Xếp hạng ",""),
    //     script: "gen.js"
    // }))