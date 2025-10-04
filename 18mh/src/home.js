function execute() {
    return Response.success([
        { title: "全部小说", input: "/novel/all?", script: "gen.js" },
        { title: "热门小说", input: "/novel/common?type=hot&", script: "gen.js" },
        { title: "最新上架", input: "/novel/common?type=last_published&", script: "gen.js" },
        { title: "最新更新", input: "/novel/common?type=newest&", script: "gen.js" }
    ]);
}
