load('config.js');

function execute() {
    return Response.success([
        { title: "Nong nhat", input: BASE_URL + "/", script: "gen.js" },
        { title: "Moi nhat", input: BASE_URL + "/list-{{page}}.htm", script: "gen.js" },
        { title: "Top tuan", input: BASE_URL + "/top7_list-{{page}}.htm", script: "gen.js" },
        { title: "Top thang", input: BASE_URL + "/top_list-{{page}}.htm", script: "gen.js" },
        { title: "5 phut+", input: BASE_URL + "/5min_list-{{page}}.htm", script: "gen.js" },
        { title: "10 phut+", input: BASE_URL + "/long_list-{{page}}.htm", script: "gen.js" }
    ]);
}
