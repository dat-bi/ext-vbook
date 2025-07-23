function execute() {
    return Response.success([
        { title: "LATEST UPDATES", input: "/latest-releases/", script: "gen.js" },
        { title: "HOT", input: "/hot/", script: "gen.js" },
        { title: "NEW RELEASES", input: "/new-releases/", script: "gen.js" },
        { title: "All Time Views", input: "/all-time-views/", script: "gen.js" },
        { title: "Name", input: "/name/", script: "gen.js" },
        { title: "Random", input: "/random/", script: "gen.js" },
        { title: "On Going", input: "/on-going/", script: "gen.js" },
        { title: "Completed", input: "/completed/", script: "gen.js" },
    ]);
}