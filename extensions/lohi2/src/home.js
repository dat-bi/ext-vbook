function execute() {
    return Response.success([
        {
            title: "Tất cả",
            input: "https://api.lohi2.com/novel/novels",
            script: "gen.js"
        },
        {
            title: "Tiên hiệp",
            input: "https://api.lohi2.com/novel/novels?genre=Tiên Hiệp",
            script: "gen.js"
        },
        {
            title: "Audio",
            input: "https://api.lohi2.com/novel/novels?tts=1",
            script: "gen.js"
        }
    ]);
}
