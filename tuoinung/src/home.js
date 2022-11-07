function execute() {
    return Response.success([
        {script: "gen.js" ,input: "https://tuoinung.com/truyen-18#gsc.tab=0", title: "Truyện 18+"},
        {script: "gen.js" , title: "Dâm", input: "https://tuoinung.com/truyen-dam#gsc.tab=0"},
        {title: "Sex", input: "https://tuoinung.com/truyen-sex#gsc.tab=0", script: "gen.js"},
        {title: "Truyện Tình", input: "https://tuoinung.com/truyen-tinh#gsc.tab=0", script: "gen.js"},
        {title: "Giới Tính", input: "https://tuoinung.com/gioi-tinh#gsc.tab=0", script: "gen.js"}
    ]);
}