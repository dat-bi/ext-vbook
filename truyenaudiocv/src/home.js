function execute() {
    return Response.success([
        {title: "", input: "/danh-sach/moi-cap-nhat", script: "gen.js"},
        {title: "", input: "/danh-sach/truyen-full", script: "gen.js"},
        {title: "", input: "/danh-sach/free-vip", script: "gen.js"},
        {title: "", input: "/bang-xep-hang", script: "gen.js"},
        {title: "", input: "/random", script: "gen.js"},
        {title: "", input: "/latest-news", script: "gen.js"},
        {title: "", input: "/add-novel", script: "gen.js"},
    ]);
}
