function execute() {
    return Response.success([
    {title : "Truyện hot", input : "danh-sach/truyen-hot/?order=story_viewed", script: "gen.js" },
    {title : "Truyện top", input : "danh-sach/truyen-top/?order=story_viewed", script: "gen.js" },
    {title : "Truyện full", input : "danh-sach/truyen-full/?order=story_viewed", script: "gen.js" },
    ])
}