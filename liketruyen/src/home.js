function execute() {
    return Response.success([
        {title: "Mới cập nhật", input: "https://liketruyen.net/the-loai/?sort=day", script: "gen.js"},
        {title: "Truyện mới", input: "https://liketruyen.net/the-loai/?sort=new", script: "gen.js"},
        {title: "Top all", input: "https://liketruyen.net/the-loai/?sort=view", script: "gen.js"},
        {title: "Top tháng", input: "https://liketruyen.net/the-loai/?sort=viewMonth", script: "gen.js"},
        {title: "Top tuần", input: "https://liketruyen.net/the-loai/?sort=viewWeek", script: "gen.js"},
        {title: "Top ngày", input: "https://liketruyen.net/the-loai/?sort=viewDay", script: "gen.js"},
        {title: "Theo dõi", input: "https://liketruyen.net/the-loai/?sort=theodoi", script: "gen.js"}
    ]);
}