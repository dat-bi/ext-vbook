function execute() {
    return Response.success([
        {title: "纯爱小说", input: "/chunai/", script: "zen.js"},
        {title: "言情小说", input: "/yanqing/", script: "gen.js"},

    ]);
}
