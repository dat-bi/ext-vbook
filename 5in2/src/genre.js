function execute() {
    var data2 = [
        { title: "Fanqie Tuần", input: "?find=&host=fanqie&minc=0&sort=viewweek&step=1&tag=", script: "gen1.js" },
        { title: "Fanqie Ngày", input: "?find=&host=fanqie&minc=0&sort=viewday&step=1&tag=", script: "gen1.js" },
        { title: "Fanqie đánh dấu", input: "?find=&host=fanqie&minc=0&sort=bookmarked&tag=", script: "gen1.js" },
        { title: "Fanqie like", input: "?find=&host=fanqie&minc=0&sort=like&tag=", script: "gen1.js" },
        { title: '🔴Bảng tổng nguyệt phiếu🔴', input: '/majax/rank/yuepiaolist?gender=male&pageNum={page}&{_csrfToken}', script: 'cat.js' },
        { title: "玄幻", input: "/majax/rank/yuepiaolist?gender=male&pageNum={page}&catId=21&{_csrfToken}", script: "gen0.js" },
        { title: "奇幻", input: "/majax/rank/yuepiaolist?gender=male&pageNum={page}&catId=1&{_csrfToken}", script: "gen0.js" },
        { title: "武侠", input: "/majax/rank/yuepiaolist?gender=male&pageNum={page}&catId=2&{_csrfToken}", script: "gen0.js" },
        { title: "仙侠", input: "/majax/rank/yuepiaolist?gender=male&pageNum={page}&catId=22&{_csrfToken}", script: "gen0.js" },
        { title: "都市", input: "/majax/rank/yuepiaolist?gender=male&pageNum={page}&catId=4&{_csrfToken}", script: "gen0.js" },
        { title: "现实", input: "/majax/rank/yuepiaolist?gender=male&pageNum={page}&catId=15&{_csrfToken}", script: "gen0.js" },
        { title: "军事", input: "/majax/rank/yuepiaolist?gender=male&pageNum={page}&catId=6&{_csrfToken}", script: "gen0.js" },
        { title: "历史", input: "/majax/rank/yuepiaolist?gender=male&pageNum={page}&catId=5&{_csrfToken}", script: "gen0.js" },
        { title: "游戏", input: "/majax/rank/yuepiaolist?gender=male&pageNum={page}&catId=7&{_csrfToken}", script: "gen0.js" },
        { title: "体育", input: "/majax/rank/yuepiaolist?gender=male&pageNum={page}&catId=8&{_csrfToken}", script: "gen0.js" },
        { title: "科幻", input: "/majax/rank/yuepiaolist?gender=male&pageNum={page}&catId=9&{_csrfToken}", script: "gen0.js" },
        { title: "诸天无限", input: "/majax/rank/yuepiaolist?gender=male&pageNum={page}&catId=20109&{_csrfToken}", script: "gen0.js" },
        { title: "悬疑", input: "/majax/rank/yuepiaolist?gender=male&pageNum={page}&catId=10&{_csrfToken}", script: "gen0.js" },
        { title: "轻小说", input: "/majax/rank/yuepiaolist?gender=male&pageNum={page}&catId=12&{_csrfToken}", script: "gen0.js" },
        {
            title: "———",
            input: "",
            script: "gen0.js"
        },
        {
            title: "畅销榜",
            input: "/majax/rank/hotsaleslist?gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "阅读榜",
            input: "/majax/rank/readindexlist?gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "书友榜",
            input: "/majax/rank/newfanslist?gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "推荐榜",
            input: "/majax/rank/reclist?gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "更新榜",
            input: "/majax/rank/updatelist?gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "签约榜",
            input: "/majax/rank/signlist?gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "新书榜",
            input: "/majax/rank/newbooklist?gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "新人榜",
            input: "/majax/rank/newauthorlist?gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "三江推荐",
            input: "/majax/recommend/sanjiangList?pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "新书强推",
            input: "/majax/recommend/strongreclist?gender=male&pageNum={page}&catId=-1&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "人气免费",
            input: "/majax/recommend/hotFreelist?gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "新书免费",
            input: "/majax/recommend/freeNewlist?gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "新书抢先",
            input: "/majax/recommend/newBooklist?gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "畅销完本",
            input: "/majax/recommend/bestSelllist?gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "🔹玄幻🔹",
            input: "",
            script: "gen0.js"
        },
        {
            title: "人气",
            input: "/majax/category/list?catId=21&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "时间",
            input: "/majax/category/list?catId=21&gender=male&orderBy=4&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "字数",
            input: "/majax/category/list?catId=21&gender=male&orderBy=3&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "收藏",
            input: "/majax/category/list?catId=21&gender=male&orderBy=11&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "推荐",
            input: "/majax/category/list?catId=21&gender=male&orderBy=9&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "点击",
            input: "/majax/category/list?catId=21&gender=male&orderBy=1&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "30万字下",
            input: "/majax/category/list?catId=21&size=1&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "30-50万",
            input: "/majax/category/list?catId=21&size=2&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "50-100万",
            input: "/majax/category/list?catId=21&size=3&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "1-2百万",
            input: "/majax/category/list?catId=21&size=4&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "200万上",
            input: "/majax/category/list?catId=21&size=5&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "———",
            input: "",
            script: "gen0.js"
        },
        {
            title: "🔸连载🔸",
            input: "/majax/category/list?catId=21&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "🔸完本🔸",
            input: "/majax/category/list?catId=21&isfinish=1&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "东方玄幻",
            input: "/majax/category/list?catId=21&subCatId=8&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "异世大陆",
            input: "/majax/category/list?catId=21&subCatId=73&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "王朝争霸",
            input: "/majax/category/list?catId=21&subCatId=58&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "高武世界",
            input: "/majax/category/list?catId=21&subCatId=78&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "————",
            input: "",
            script: "gen0.js"
        },
        {
            title: "————",
            input: "",
            script: "gen0.js"
        },
        {
            title: "🔹奇幻🔹",
            input: "",
            script: "gen0.js"
        },
        {
            title: "人气",
            input: "/majax/category/list?catId=1&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "时间",
            input: "/majax/category/list?catId=1&gender=male&orderBy=4&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "字数",
            input: "/majax/category/list?catId=1&gender=male&orderBy=3&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "收藏",
            input: "/majax/category/list?catId=1&gender=male&orderBy=11&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "推荐",
            input: "/majax/category/list?catId=1&gender=male&orderBy=9&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "点击",
            input: "/majax/category/list?catId=1&gender=male&orderBy=1&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "30万下",
            input: "/majax/category/list?catId=1&size=1&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "30-50万",
            input: "/majax/category/list?catId=1&size=2&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "50-100万",
            input: "/majax/category/list?catId=1&size=3&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "1-2百万",
            input: "/majax/category/list?catId=1&size=4&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "200万上",
            input: "/majax/category/list?catId=1&size=5&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "———",
            input: "",
            script: "gen0.js"
        },
        {
            title: "🔸连载🔸",
            input: "/majax/category/list?catId=1&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "🔸完本🔸",
            input: "/majax/category/list?catId=1&isfinish=1&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "现代魔法",
            input: "/majax/category/list?catId=1&subCatId=38&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "剑与魔法",
            input: "/majax/category/list?catId=1&subCatId=62&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "史诗奇幻",
            input: "/majax/category/list?catId=1&subCatId=201&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "神秘幻想",
            input: "/majax/category/list?catId=1&subCatId=202&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "历史神话",
            input: "/majax/category/list?catId=1&subCatId=20092&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "另类幻想",
            input: "/majax/category/list?catId=1&subCatId=20093&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "🔹武侠🔹",
            input: "",
            script: "gen0.js"
        },
        {
            title: "人气",
            input: "/majax/category/list?catId=2&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "时间",
            input: "/majax/category/list?catId=2&gender=male&orderBy=4&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "字数",
            input: "/majax/category/list?catId=2&gender=male&orderBy=3&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "收藏",
            input: "/majax/category/list?catId=2&gender=male&orderBy=11&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "推荐",
            input: "/majax/category/list?catId=2&gender=male&orderBy=9&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "点击",
            input: "/majax/category/list?catId=2&gender=male&orderBy=1&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "30万下",
            input: "/majax/category/list?catId=2&size=1&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "30-50万",
            input: "/majax/category/list?catId=2&size=2&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "50-100万",
            input: "/majax/category/list?catId=2&size=3&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "1-2百万",
            input: "/majax/category/list?catId=2&size=4&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "200万上",
            input: "/majax/category/list?catId=2&size=5&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "———",
            input: "",
            script: "gen0.js"
        },
        {
            title: "🔸连载🔸",
            input: "/majax/category/list?catId=2&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "🔸完本🔸",
            input: "/majax/category/list?catId=2&isfinish=1&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "传统武侠",
            input: "/majax/category/list?catId=2&subCatId=5&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "武侠幻想",
            input: "/majax/category/list?catId=2&subCatId=30&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "国士无双",
            input: "/majax/category/list?catId=2&subCatId=206&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "古武未来",
            input: "/majax/category/list?catId=2&subCatId=20099&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "武侠同人",
            input: "/majax/category/list?catId=2&subCatId=20100&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "————",
            input: "",
            script: "gen0.js"
        },
        {
            title: "🔹仙侠🔹",
            input: "",
            script: "gen0.js"
        },
        {
            title: "人气",
            input: "/majax/category/list?catId=22&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "时间",
            input: "/majax/category/list?catId=22&gender=male&orderBy=4&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "字数",
            input: "/majax/category/list?catId=22&gender=male&orderBy=3&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "收藏",
            input: "/majax/category/list?catId=22&gender=male&orderBy=11&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "推荐",
            input: "/majax/category/list?catId=22&gender=male&orderBy=9&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "点击",
            input: "/majax/category/list?catId=22&gender=male&orderBy=1&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "30万下",
            input: "/majax/category/list?catId=22&size=1&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "30-50万",
            input: "/majax/category/list?catId=22&size=2&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "50-100万",
            input: "/majax/category/list?catId=22&size=3&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "1-2百万",
            input: "/majax/category/list?catId=22&size=4&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "200万上",
            input: "/majax/category/list?catId=22&size=5&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "———",
            input: "",
            script: "gen0.js"
        },
        {
            title: "🔸连载🔸",
            input: "/majax/category/list?catId=22&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "🔸完本🔸",
            input: "/majax/category/list?catId=22&isfinish=1&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "修真文明",
            input: "/majax/category/list?catId=22&subCatId=18&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "幻想修仙",
            input: "/majax/category/list?catId=22&subCatId=44&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "现代修真",
            input: "/majax/category/list?catId=22&subCatId=64&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "神话修真",
            input: "/majax/category/list?catId=22&subCatId=207&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "古典仙侠",
            input: "/majax/category/list?catId=22&subCatId=20101&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "————",
            input: "",
            script: "gen0.js"
        },
        {
            title: "🔹都市🔹",
            input: "",
            script: "gen0.js"
        },
        {
            title: "人气",
            input: "/majax/category/list?catId=4&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "时间",
            input: "/majax/category/list?catId=4&gender=male&orderBy=4&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "字数",
            input: "/majax/category/list?catId=4&gender=male&orderBy=3&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "收藏",
            input: "/majax/category/list?catId=4&gender=male&orderBy=11&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "推荐",
            input: "/majax/category/list?catId=4&gender=male&orderBy=9&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "点击",
            input: "/majax/category/list?catId=4&gender=male&orderBy=1&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "30万下",
            input: "/majax/category/list?catId=4&size=1&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "30-50万",
            input: "/majax/category/list?catId=4&size=2&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "50-100万",
            input: "/majax/category/list?catId=4&size=3&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "1-2百万",
            input: "/majax/category/list?catId=4&size=4&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "200万上",
            input: "/majax/category/list?catId=4&size=5&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "———",
            input: "",
            script: "gen0.js"
        },
        {
            title: "🔸连载🔸",
            input: "/majax/category/list?catId=4&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "🔸完本🔸",
            input: "/majax/category/list?catId=4&isfinish=1&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "爱情婚姻",
            input: "/majax/category/list?catId=4&subCatId=65535&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "都市生活",
            input: "/majax/category/list?catId=4&subCatId=12&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "都市异能",
            input: "/majax/category/list?catId=4&subCatId=16&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "异术超能",
            input: "/majax/category/list?catId=4&subCatId=74&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "青春校园",
            input: "/majax/category/list?catId=4&subCatId=130&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "娱乐明星",
            input: "/majax/category/list?catId=4&subCatId=151&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "商战职场",
            input: "/majax/category/list?catId=4&subCatId=153&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "————",
            input: "",
            script: "gen0.js"
        },
        {
            title: "————",
            input: "",
            script: "gen0.js"
        },
        {
            title: "🔹现实🔹",
            input: "",
            script: "gen0.js"
        },
        {
            title: "人气",
            input: "/majax/category/list?catId=15&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "时间",
            input: "/majax/category/list?catId=15&gender=male&orderBy=4&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "字数",
            input: "/majax/category/list?catId=15&gender=male&orderBy=3&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "收藏",
            input: "/majax/category/list?catId=15&gender=male&orderBy=11&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "推荐",
            input: "/majax/category/list?catId=15&gender=male&orderBy=9&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "点击",
            input: "/majax/category/list?catId=15&gender=male&orderBy=1&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "30万下",
            input: "/majax/category/list?catId=15&size=1&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "30-50万",
            input: "/majax/category/list?catId=15&size=2&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "50-100万",
            input: "/majax/category/list?catId=15&size=3&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "1-2百万",
            input: "/majax/category/list?catId=15&size=4&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "200万上",
            input: "/majax/category/list?catId=15&size=5&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "———",
            input: "",
            script: "gen0.js"
        },
        {
            title: "🔸连载🔸",
            input: "/majax/category/list?catId=15&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "🔸完本🔸",
            input: "/majax/category/list?catId=15&isfinish=1&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "时代叙事",
            input: "/majax/category/list?catId=15&subCatId=20106&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "家庭伦理",
            input: "/majax/category/list?catId=15&subCatId=6&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "女性题材",
            input: "/majax/category/list?catId=15&subCatId=20104&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "青年故事",
            input: "/majax/category/list?catId=15&subCatId=20108&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "社会悬疑",
            input: "/majax/category/list?catId=15&subCatId=20105&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "人间百态",
            input: "/majax/category/list?catId=15&subCatId=209&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "成功励志",
            input: "/majax/category/list?catId=15&subCatId=20107&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "————",
            input: "",
            script: "gen0.js"
        },
        {
            title: "————",
            input: "",
            script: "gen0.js"
        },
        {
            title: "🔹军事🔹",
            input: "",
            script: "gen0.js"
        },
        {
            title: "人气",
            input: "/majax/category/list?catId=6&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "时间",
            input: "/majax/category/list?catId=6&gender=male&orderBy=4&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "字数",
            input: "/majax/category/list?catId=6&gender=male&orderBy=3&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "收藏",
            input: "/majax/category/list?catId=6&gender=male&orderBy=11&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "推荐",
            input: "/majax/category/list?catId=6&gender=male&orderBy=9&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "点击",
            input: "/majax/category/list?catId=6&gender=male&orderBy=1&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "30万下",
            input: "/majax/category/list?catId=6&size=1&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "30-50万",
            input: "/majax/category/list?catId=6&size=2&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "50-100万",
            input: "/majax/category/list?catId=6&size=3&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "1-2百万",
            input: "/majax/category/list?catId=6&size=4&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "200万上",
            input: "/majax/category/list?catId=6&size=5&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "———",
            input: "",
            script: "gen0.js"
        },
        {
            title: "🔸连载🔸",
            input: "/majax/category/list?catId=6&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "🔸完本🔸",
            input: "/majax/category/list?catId=6&isfinish=1&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "军旅生涯",
            input: "/majax/category/list?catId=6&subCatId=54&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "军事战争",
            input: "/majax/category/list?catId=6&subCatId=65&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "战争幻想",
            input: "/majax/category/list?catId=6&subCatId=80&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "抗战烽火",
            input: "/majax/category/list?catId=6&subCatId=230&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "谍战特工",
            input: "/majax/category/list?catId=6&subCatId=231&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "————",
            input: "",
            script: "gen0.js"
        },
        {
            title: "🔹历史🔹",
            input: "",
            script: "gen0.js"
        },
        {
            title: "人气",
            input: "/majax/category/list?catId=5&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "时间",
            input: "/majax/category/list?catId=5&gender=male&orderBy=4&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "字数",
            input: "/majax/category/list?catId=5&gender=male&orderBy=3&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "收藏",
            input: "/majax/category/list?catId=5&gender=male&orderBy=11&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "推荐",
            input: "/majax/category/list?catId=5&gender=male&orderBy=9&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "点击",
            input: "/majax/category/list?catId=5&gender=male&orderBy=1&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "30万下",
            input: "/majax/category/list?catId=5&size=1&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "30-50万",
            input: "/majax/category/list?catId=5&size=2&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "50-100万",
            input: "/majax/category/list?catId=5&size=3&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "1-2百万",
            input: "/majax/category/list?catId=5&size=4&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "200万上",
            input: "/majax/category/list?catId=5&size=5&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "———",
            input: "",
            script: "gen0.js"
        },
        {
            title: "🔸连载🔸",
            input: "/majax/category/list?catId=5&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "🔸完本🔸",
            input: "/majax/category/list?catId=5&isfinish=1&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "架空励史",
            input: "/majax/category/list?catId=5&subCatId=22&isfinish=1&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "秦汉三国",
            input: "/majax/category/list?catId=5&subCatId=48&isfinish=1&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "上古先秦",
            input: "/majax/category/list?catId=5&subCatId=220&isfinish=1&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "历史传记",
            input: "/majax/category/list?catId=5&subCatId=32&isfinish=1&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "两晋隋唐",
            input: "/majax/category/list?catId=5&subCatId=222&isfinish=1&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "五代十国",
            input: "/majax/category/list?catId=5&subCatId=223&isfinish=1&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "两宋元明",
            input: "/majax/category/list?catId=5&subCatId=224&isfinish=1&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "清史民国",
            input: "/majax/category/list?catId=5&subCatId=225&isfinish=1&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "外国历史",
            input: "/majax/category/list?catId=5&subCatId=226&isfinish=1&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "民间传说",
            input: "/majax/category/list?catId=5&subCatId=20094&isfinish=1&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "————",
            input: "",
            script: "gen0.js"
        },
        {
            title: "————",
            input: "",
            script: "gen0.js"
        },
        {
            title: "🔹游戏🔹",
            input: "",
            script: "gen0.js"
        },
        {
            title: "人气",
            input: "/majax/category/list?catId=7&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "时间",
            input: "/majax/category/list?catId=7&gender=male&orderBy=4&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "字数",
            input: "/majax/category/list?catId=7&gender=male&orderBy=3&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "收藏",
            input: "/majax/category/list?catId=7&gender=male&orderBy=11&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "推荐",
            input: "/majax/category/list?catId=7&gender=male&orderBy=9&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "点击",
            input: "/majax/category/list?catId=7&gender=male&orderBy=1&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "30万下",
            input: "/majax/category/list?catId=7&size=1&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "30-50万",
            input: "/majax/category/list?catId=7&size=2&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "50-100万",
            input: "/majax/category/list?catId=7&size=3&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "1-2百万",
            input: "/majax/category/list?catId=7&size=4&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "200万上",
            input: "/majax/category/list?catId=7&size=5&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "———",
            input: "",
            script: "gen0.js"
        },
        {
            title: "🔸连载🔸",
            input: "/majax/category/list?catId=7&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "🔸完本🔸",
            input: "/majax/category/list?catId=7&isfinish=1&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "电子竞技",
            input: "/majax/category/list?catId=7&subCatId=7&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "虚拟网游",
            input: "/majax/category/list?catId=7&subCatId=70&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "游戏异界",
            input: "/majax/category/list?catId=7&subCatId=240&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "游戏系统",
            input: "/majax/category/list?catId=7&subCatId=20102&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "游戏主播",
            input: "/majax/category/list?catId=7&subCatId=20103&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "————",
            input: "",
            script: "gen0.js"
        },
        {
            title: "🔹体育🔹",
            input: "",
            script: "gen0.js"
        },
        {
            title: "人气",
            input: "/majax/category/list?catId=8&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "时间",
            input: "/majax/category/list?catId=8&gender=male&orderBy=4&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "字数",
            input: "/majax/category/list?catId=8&gender=male&orderBy=3&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "收藏",
            input: "/majax/category/list?catId=8&gender=male&orderBy=11&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "推荐",
            input: "/majax/category/list?catId=8&gender=male&orderBy=9&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "点击",
            input: "/majax/category/list?catId=8&gender=male&orderBy=1&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "30万下",
            input: "/majax/category/list?catId=8&size=1&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "30-50万",
            input: "/majax/category/list?catId=8&size=2&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "50-100万",
            input: "/majax/category/list?catId=8&size=3&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "1-2百万",
            input: "/majax/category/list?catId=8&size=4&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "200万上",
            input: "/majax/category/list?catId=8&size=5&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "———",
            input: "",
            script: "gen0.js"
        },
        {
            title: "🔸连载🔸",
            input: "/majax/category/list?catId=8&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "🔸完本🔸",
            input: "/majax/category/list?catId=8&isfinish=1&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "篮球运动",
            input: "/majax/category/list?catId=8&subCatId=28&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "体育赛事",
            input: "/majax/category/list?catId=8&subCatId=55&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "足球运动",
            input: "/majax/category/list?catId=8&subCatId=82&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "🔹科幻🔹",
            input: "",
            script: "gen0.js"
        },
        {
            title: "人气",
            input: "/majax/category/list?catId=9&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "时间",
            input: "/majax/category/list?catId=9&gender=male&orderBy=4&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "字数",
            input: "/majax/category/list?catId=9&gender=male&orderBy=3&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "收藏",
            input: "/majax/category/list?catId=9&gender=male&orderBy=11&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "推荐",
            input: "/majax/category/list?catId=9&gender=male&orderBy=9&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "点击",
            input: "/majax/category/list?catId=9&gender=male&orderBy=1&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "30万下",
            input: "/majax/category/list?catId=9&size=1&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "30-50万",
            input: "/majax/category/list?catId=9&size=2&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "50-100万",
            input: "/majax/category/list?catId=9&size=3&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "1-2百万",
            input: "/majax/category/list?catId=9&size=4&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "200万上",
            input: "/majax/category/list?catId=9&size=5&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "———",
            input: "",
            script: "gen0.js"
        },
        {
            title: "🔸连载🔸",
            input: "/majax/category/list?catId=9&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "🔸完本🔸",
            input: "/majax/category/list?catId=9&isfinish=1&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "古武机甲",
            input: "/majax/category/list?catId=9&subCatId=21&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "未来世界",
            input: "/majax/category/list?catId=9&subCatId=25&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "星际文明",
            input: "/majax/category/list?catId=9&subCatId=68&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "超级科技",
            input: "/majax/category/list?catId=9&subCatId=250&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "时空穿梭",
            input: "/majax/category/list?catId=9&subCatId=251&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "进化变异",
            input: "/majax/category/list?catId=9&subCatId=252&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "末世危机",
            input: "/majax/category/list?catId=9&subCatId=253&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "————",
            input: "",
            script: "gen0.js"
        },
        {
            title: "————",
            input: "",
            script: "gen0.js"
        },
        {
            title: "🔹悬疑🔹",
            input: "",
            script: "gen0.js"
        },
        {
            title: "人气",
            input: "/majax/category/list?catId=10&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "时间",
            input: "/majax/category/list?catId=10&gender=male&orderBy=4&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "字数",
            input: "/majax/category/list?catId=10&gender=male&orderBy=3&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "收藏",
            input: "/majax/category/list?catId=10&gender=male&orderBy=11&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "推荐",
            input: "/majax/category/list?catId=10&gender=male&orderBy=9&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "点击",
            input: "/majax/category/list?catId=10&gender=male&orderBy=1&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "30万下",
            input: "/majax/category/list?catId=10&size=1&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "30-50万",
            input: "/majax/category/list?catId=10&size=2&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "50-100万",
            input: "/majax/category/list?catId=10&size=3&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "1-2百万",
            input: "/majax/category/list?catId=10&size=4&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "200万上",
            input: "/majax/category/list?catId=10&size=5&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "———",
            input: "",
            script: "gen0.js"
        },
        {
            title: "🔸连载🔸",
            input: "/majax/category/list?catId=10&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "🔸完本🔸",
            input: "/majax/category/list?catId=10&isfinish=1&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "诡秘悬疑",
            input: "/majax/category/list?catId=10&subCatId=26&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "奇妙世界",
            input: "/majax/category/list?catId=10&subCatId=35&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "侦探推理",
            input: "/majax/category/list?catId=10&subCatId=57&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "探险求生",
            input: "/majax/category/list?catId=10&subCatId=260&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "古今传奇",
            input: "/majax/category/list?catId=10&subCatId=20095&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "————",
            input: "",
            script: "gen0.js"
        },
        {
            title: "🔹诸天无限🔹",
            input: "",
            script: "gen0.js"
        },
        {
            title: "人气",
            input: "/majax/category/list?catId=20109&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "时间",
            input: "/majax/category/list?catId=20109&gender=male&orderBy=4&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "字数",
            input: "/majax/category/list?catId=20109&gender=male&orderBy=3&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "收藏",
            input: "/majax/category/list?catId=20109&gender=male&orderBy=11&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "推荐",
            input: "/majax/category/list?catId=20109&gender=male&orderBy=9&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "点击",
            input: "/majax/category/list?catId=20109&gender=male&orderBy=1&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "30万下",
            input: "/majax/category/list?catId=20109&size=1&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "30-50万",
            input: "/majax/category/list?catId=20109&size=2&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "50-100万",
            input: "/majax/category/list?catId=20109&size=3&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "1-2百万",
            input: "/majax/category/list?catId=20109&size=4&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "200万上",
            input: "/majax/category/list?catId=20109&size=5&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "———",
            input: "",
            script: "gen0.js"
        },
        {
            title: "🔸连载🔸",
            input: "/majax/category/list?catId=20109&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "🔸完本🔸",
            input: "/majax/category/list?catId=20109&isfinish=1&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "无限",
            input: "/majax/category/list?catId=20109&subCatId=20110&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "诸天",
            input: "/majax/category/list?catId=20109&subCatId=20111&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "综漫",
            input: "/majax/category/list?catId=20109&subCatId=20112&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "🔹轻小说🔹",
            input: "",
            script: "gen0.js"
        },
        {
            title: "人气",
            input: "/majax/category/list?catId=12&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "时间",
            input: "/majax/category/list?catId=12&gender=male&orderBy=4&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "字数",
            input: "/majax/category/list?catId=12&gender=male&orderBy=3&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "收藏",
            input: "/majax/category/list?catId=12&gender=male&orderBy=11&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "推荐",
            input: "/majax/category/list?catId=12&gender=male&orderBy=9&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "点击",
            input: "/majax/category/list?catId=12&gender=male&orderBy=1&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "30万下",
            input: "/majax/category/list?catId=12&size=1&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "30-50万",
            input: "/majax/category/list?catId=12&size=2&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "50-100万",
            input: "/majax/category/list?catId=12&size=3&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "1-2百万",
            input: "/majax/category/list?catId=12&size=4&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "200万上",
            input: "/majax/category/list?catId=12&size=5&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "———",
            input: "",
            script: "gen0.js"
        },
        {
            title: "🔸连载🔸",
            input: "/majax/category/list?catId=12&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "🔸完本🔸",
            input: "/majax/category/list?catId=12&isfinish=1&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "原生幻想",
            input: "/majax/category/list?catId=12&subCatId=60&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "现代幻想",
            input: "/majax/category/list?catId=12&subCatId=10&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "衍生同人",
            input: "/majax/category/list?catId=12&subCatId=281&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "搞笑吐槽",
            input: "/majax/category/list?catId=12&subCatId=282&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "恋爱日常",
            input: "/majax/category/list?catId=12&subCatId=66&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "————",
            input: "",
            script: "gen0.js"
        },
        {
            title: "🔹短篇🔹",
            input: "",
            script: "gen0.js"
        },
        {
            title: "人气",
            input: "/majax/category/list?catId=20076&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "时间",
            input: "/majax/category/list?catId=20076&gender=male&orderBy=4&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "字数",
            input: "/majax/category/list?catId=20076&gender=male&orderBy=3&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "收藏",
            input: "/majax/category/list?catId=20076&gender=male&orderBy=11&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "推荐",
            input: "/majax/category/list?catId=20076&gender=male&orderBy=9&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "点击",
            input: "/majax/category/list?catId=20076&gender=male&orderBy=1&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "30万下",
            input: "/majax/category/list?catId=20076&size=1&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "30-50万",
            input: "/majax/category/list?catId=20076&size=2&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "50-100万",
            input: "/majax/category/list?catId=20076&size=3&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "1-2百万",
            input: "/majax/category/list?catId=20076&size=4&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "200万上",
            input: "/majax/category/list?catId=20076&size=5&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "———",
            input: "",
            script: "gen0.js"
        },
        {
            title: "🔸连载🔸",
            input: "/majax/category/list?catId=20076&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "🔸完本🔸",
            input: "/majax/category/list?catId=20076&isfinish=1&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "诗歌散文",
            input: "/majax/category/list?catId=20076&subCatId=20097&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "人物传记",
            input: "/majax/category/list?catId=20076&subCatId=20098&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "影视剧本",
            input: "/majax/category/list?catId=20076&subCatId=20075&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "评论文集",
            input: "/majax/category/list?catId=20076&subCatId=20077&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "生活随笔",
            input: "/majax/category/list?catId=20076&subCatId=20078&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "美文游记",
            input: "/majax/category/list?catId=20076&subCatId=20079&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "短篇小说",
            input: "/majax/category/list?catId=20076&subCatId=20096&gender=male&pageNum={page}&{_csrfToken}",
            script: "gen0.js"
        },
        {
            title: "————",
            input: "",
            script: "gen0.js"
        }
    ]
    return Response.success(data2);
}