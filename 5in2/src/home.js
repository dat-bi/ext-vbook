function execute() {
    return Response.success([
        { title: "Q票榜", input: "/majax/rank/yuepiaolist?gender=male&pageNum={page}&{_csrfToken}", script: "gen0.js" },
        // { title: "Fanqie Tuần", input: "?find=&host=fanqie&minc=0&sort=viewweek&step=1&tag=", script: "gen1.js" },
        // { title: "Fanqie Ngày", input: "?find=&host=fanqie&minc=0&sort=viewday&step=1&tag=", script: "gen1.js" },
        // { title: "Fanqie đánh dấu", input: "?find=&host=fanqie&minc=0&sort=bookmarked&tag=", script: "gen1.js" },
        // { title: "Fanqie like", input: "?find=&host=fanqie&minc=0&sort=like&tag=", script: "gen1.js" },
        { title: "Qidian Tuần", input: "?find=&host=qidian&minc=0&sort=viewweek&step=1&tag=", script: "gen1.js" },
        { title: "Qidian Ngày", input: "?find=&host=qidian&minc=0&sort=viewday&step=1&tag=", script: "gen1.js" }
    ]);
}