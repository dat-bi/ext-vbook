function execute() {
    return Response.success([
        { title: "浪漫言情", input: "fenlei_1_", script: "zen.js" },
        { title: "耽美小说", input: "fenlei_2_", script: "zen.js" },
        { title: "同人小说", input: "fenlei_3_", script: "zen.js" },
        { title: "综合小说", input: "fenlei_5_", script: "zen.js" },
        { title: "总点击榜", input: "top_allvisit_", script: "zen.js" },
        { title: "总推荐榜", input: "top_allvote_", script: "zen.js" },
        { title: "月点击榜", input: "top_monthvisit_", script: "zen.js" },
        { title: "月推荐榜", input: "top_weekvisit_", script: "zen.js" },
        { title: "周点击榜", input: "top_weekvote_", script: "zen.js" },
        { title: "周推荐榜", input: "top_postdate_", script: "zen.js" },
        { title: "最新入库", input: "top_lastupdate_", script: "zen.js" },
        { title: "最近更新", input: "top_goodnum_", script: "zen.js" },
        { title: "总收藏榜", input: "top_words_", script: "zen.js" }
    ]);
}
