function execute() {
    return Response.success([
        {script: "gen.js" ,input: "/truyen-18#gsc.tab=0", title: "Truyện 18+"},
        {script: "gen.js" , title: "Dâm", input: "/truyen-dam#gsc.tab=0"},
        {title: "Sex", input: "/truyen-sex#gsc.tab=0", script: "gen.js"},
        {title: "Truyện Tình", input: "/truyen-tinh#gsc.tab=0", script: "gen.js"},
        {title: "Giới Tính", input: "/gioi-tinh#gsc.tab=0", script: "gen.js"}
    ]);
}