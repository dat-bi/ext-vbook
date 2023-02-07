function execute() {
    return Response.success([
        {title: "福利文选", input: "/flwx/", script: "gen.js"},
        {title: "乱伦", input: "/luanlun/", script: "gen.js"},
    ]);
}