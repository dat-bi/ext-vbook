function execute() {
    return Response.success([
        {title: "Mới cập nhật", input: "/the-loai/?sort=day", script: "gen.js"},
        {title: "Truyện mới", input: "/the-loai/?sort=new", script: "gen.js"},
        {title: "Top all", input: "/the-loai/?sort=view", script: "gen.js"},
        {title: "Top tháng", input: "/the-loai/?sort=viewMonth", script: "gen.js"},
        {title: "Top tuần", input: "/the-loai/?sort=viewWeek", script: "gen.js"},
        {title: "Top ngày", input: "/the-loai/?sort=viewDay", script: "gen.js"},
        {title: "Theo dõi", input: "/the-loai/?sort=theodoi", script: "gen.js"}
    ]);
}